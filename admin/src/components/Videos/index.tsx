import React, { useState, useEffect, FC } from "react";
import Video from "@api.video/nodejs-client/lib/model/Video";
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

export interface IVideosProps {
  video: Video;
}

const VideoView: FC<IVideosProps> = ({ video }): JSX.Element => {
  const { assets, videoId, title, createdAt } = video;

  return (
    <>
      <Wrapper>
        <Thumbnail src={assets?.thumbnail} alt={"thumbnail"}></Thumbnail>

        <CustomVideos autoPlay muted loop preload="auto">
          <source src={assets?.mp4} type="video/mp4" />
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
        </SubInformationsWrapper>
      </Wrapper>
    </>
  );
};

export default VideoView;
