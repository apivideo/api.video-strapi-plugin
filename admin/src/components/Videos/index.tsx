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
import DialogDelete from "../Dialog";

export interface IVideosProps {
  video: CustomVideo;
  updateData: () => void;
}

const VideoView: FC<IVideosProps> = ({ video, updateData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { id, videoId, title, description, thumbnail, mp4, createdAt } = video;

  const deleteVideo = async () => {
    await assetRequest.delete(id, videoId);
    setIsDeleteDialogOpen(false);
    updateData();
  };

  const openDialog = (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };
  const formatedCreatedAt = getDayMonthYearHourDate(createdAt);

  return (
    <Container>
      <WrapperVideo onClick={() => setIsModalOpen(true)}>
        <Thumbnail src={thumbnail} alt={"thumbnail"} />
        <DeleteIcon onClick={openDialog} aria-label="Delete" icon={<Trash />} />
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
      {isDeleteDialogOpen && (
        <DialogDelete
          title={title}
          isOpen={isDeleteDialogOpen}
          close={() => setIsDeleteDialogOpen(false)}
          deleteVideo={deleteVideo}
        />
      )}
    </Container>
  );
};

export default VideoView;
