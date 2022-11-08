import React, { FC } from "react";
import styled from "styled-components";
import { VideoCover } from "../../../assets/VideoCover";

interface IImportZoneProps {
  initialState: number;
  openFilePicker: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  sourceRef: React.RefObject<HTMLSourceElement>;
}

const ImportZone: FC<IImportZoneProps> = ({
  initialState,
  openFilePicker,
  videoRef,
  sourceRef,
}) => {
  return (
    <Wrapper onClick={openFilePicker}>
      {initialState === 0 && <VideoCover />}

      <ThumbnailImg isShowed={initialState === 1}>
        <video ref={videoRef}>
          <source ref={sourceRef} />
        </video>
      </ThumbnailImg>
      <Title>Select a video file to upload</Title>
      <Subtitle>or drag and drop it here</Subtitle>
    </Wrapper>
  );
};

export default ImportZone;

const UploadImage = styled.img`
  width: 200px;
  height: auto;
  opacity: 0.4;
  transition: opacity 0.4s ease-in-out;
`;

export const ThumbnailImg = styled.div<{ isShowed: boolean }>`
  height: ${(props) => (props.isShowed ? "150px" : "0px")};
  border-radius: 4px;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  visibility: ${(props) => (props.isShowed ? "visible" : "hidden")};
  video {
    height: 100%;
    border-radius: 4px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px dashed #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border 0.4s ease-in-out;
  margin-bottom: 20px;

  &:hover {
    border: 1px dashed #4642eb;
  }

  &:hover ${UploadImage} {
    opacity: 0.8;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  padding: 20px 0 10px 0;
  color: #32324d;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666687;
`;
