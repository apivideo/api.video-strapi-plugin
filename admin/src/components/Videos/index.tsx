import React, { useState, useEffect, FC } from "react";
import {
  WrapperVideo,
  Thumbnail,
  SubInformationsWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  Container,
  DeleteIcon,
} from "./styles";
import { CustomVideo } from "../../../../types";
import Trash from "@strapi/icons/Trash";

import assetRequest from "../../api/assets";
import { getDayMonthYearHourDate } from "../../date";
import UpdateVideoModal from "../Modal/updateVideo";

export interface IVideosProps {
  video: CustomVideo;
  updateData: () => void;
}

const VideoView: FC<IVideosProps> = ({ video, updateData }): JSX.Element => {
  const { id, videoId, title, description, thumbnail, mp4, createdAt } = video;

  const deleteVideo = async () => {
    await assetRequest.delete(id, videoId);
    updateData();
  };
  const formatedCreatedAt = getDayMonthYearHourDate(createdAt);

  return (
    <Container>
      <WrapperVideo>
        <Thumbnail src={thumbnail} alt={"thumbnail"}></Thumbnail>

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

      <UpdateVideoModal video={video} />
    </Container>
  );
};

export default VideoView;
