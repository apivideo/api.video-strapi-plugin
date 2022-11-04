import React, { useState, useEffect, FC } from "react";
import {
  WrapperVideo,
  Thumbnail,
  SubInformationsWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  CustomVideos,
  Container,
  DeleteIcon,
} from "./styles";
import { CustomVideo } from "../../../../types";
import Trash from "@strapi/icons/Trash";

import assetRequest from "../../api/assets";

export interface IVideosProps {
  video: CustomVideo;
  updateData: () => void;
}

const VideoView: FC<IVideosProps> = ({ video, updateData }): JSX.Element => {
  const { id, videoId, title, thumbnail, mp4 } = video;

  const deleteVideo = async () => {
    const data = await assetRequest.delete(id, videoId);
    updateData();
  };

  return (
    <Container>
      <WrapperVideo>
        <Thumbnail src={thumbnail} alt={"thumbnail"}></Thumbnail>

        <CustomVideos autoPlay muted loop preload="auto">
          <source src={mp4} type="video/mp4" />
        </CustomVideos>
        <DeleteIcon
          onClick={deleteVideo}
          aria-label="Delete"
          icon={<Trash />}
        />
      </WrapperVideo>

      <SubInformationsWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>
            <p>Description</p>
          </SubTitle>
        </TitleWrapper>
      </SubInformationsWrapper>
    </Container>
  );
};

export default VideoView;
