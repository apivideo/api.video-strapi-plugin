import React, { useState, useEffect, FC } from "react";
import {
  Wrapper,
  Thumbnail,
  SubInformationsWrapper,
  Avatar,
  Initials,
  TitleWrapper,
  Title,
  SubTitle,
  CustomVideos,
} from "./styles";
import { CustomVideo } from "../../../../types";
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
    <>
      <Wrapper>
        <Thumbnail src={thumbnail} alt={"thumbnail"}></Thumbnail>

        <CustomVideos autoPlay muted loop preload="auto">
          <source src={mp4} type="video/mp4" />
        </CustomVideos>
        <SubInformationsWrapper>
          <Avatar>
            <Initials>API</Initials>
          </Avatar>
          <TitleWrapper>
            <Title>{title}</Title>
            <SubTitle>
              <p>API Video</p>
            </SubTitle>
          </TitleWrapper>
          <button onClick={deleteVideo}>delete</button>
        </SubInformationsWrapper>
      </Wrapper>
    </>
  );
};

export default VideoView;
