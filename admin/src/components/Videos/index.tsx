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
import { getDayMonthYearHourDate } from "../../date";

export interface IVideosProps {
  video: CustomVideo;
  updateData: () => void;
}

const VideoView: FC<IVideosProps> = ({ video, updateData }): JSX.Element => {
  const { id, videoId, title, description, thumbnail, mp4, createdAt } = video;

  const deleteVideo = async () => {
    const data = await assetRequest.delete(id, videoId);
    updateData();
  };
  const formatedCreatedAt = getDayMonthYearHourDate(createdAt);

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
          <SubTitle>{description}</SubTitle>
          <p>{formatedCreatedAt}</p>
        </TitleWrapper>
      </SubInformationsWrapper>
    </Container>
  );
};

export default VideoView;
