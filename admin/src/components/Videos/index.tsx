import React, { useState, useEffect, FC } from "react";
import {
  WrapperVideo,
  Thumbnail,
  TitleWrapper,
  Title,
  DateStyle,
  SubTitle,
  Container,
  DeleteIcon,
  ImageOverlay,
} from "./styles";
import { CustomVideo } from "../../../../types";
import Trash from "@strapi/icons/Trash";

import assetRequest from "../../api/assets";
import { getDayMonthYearHourDate } from "../../utils/date";
import UpdateVideoModal from "../Modal/updateVideo";

export interface IVideosProps {
  video: CustomVideo;
  updateData: () => void;
}

const VideoView: FC<IVideosProps> = ({ video, updateData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, videoId, title, description, thumbnail, mp4, createdAt } = video;

  const deleteVideo = async () => {
    await assetRequest.delete(id, videoId);
    updateData();
  };
  const formatedCreatedAt = getDayMonthYearHourDate(createdAt);

  return (
    <Container>
      <WrapperVideo onClick={() => setIsModalOpen(true)}>
        <Thumbnail src={thumbnail} alt={"thumbnail"} />
        <DeleteIcon
          onClick={deleteVideo}
          aria-label="Delete"
          icon={<Trash />}
        />
      </WrapperVideo>

      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <DateStyle>{formatedCreatedAt}</DateStyle>
      </TitleWrapper>

      {isModalOpen && (
        <UpdateVideoModal
          video={video}
          update={updateData}
          close={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default VideoView;
