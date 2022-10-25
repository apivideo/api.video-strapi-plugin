import React, { useEffect, useRef, useState, FC } from "react";
// import styles from './upload.module.css'
import { VideoUploader, VideoUploadResponse } from "@api.video/video-uploader";
import assetRequest from "../../api/assets";
import { Button } from "@strapi/design-system/Button";
import { ProgressBar } from "@strapi/design-system/ProgressBar";

import Plus from "@strapi/icons/Plus";

export interface IUploadButtonProps {
  updateData: () => void;
}

const UploadButton: FC<IUploadButtonProps> = ({ updateData }): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [video, setVideo] = useState<VideoUploadResponse | undefined>(
    undefined
  );
  const [status, setStatus] = useState({ ingested: false, encoded: false });

  // CONSTANTS
  const inputFile = useRef<HTMLInputElement | null>(null);
  // HANDLERS
  const openFilePicker = () => {
    setVideo(undefined);
    !isUploading && inputFile && inputFile?.current?.click();
  };

  const fileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const { newVideo, token } = await assetRequest.createVideoId();
    if (files?.length) {
      setIsUploading(true);
      const uploader = new VideoUploader({
        file: files[0],
        accessToken: token.accessToken,
        videoId: newVideo.videoId,
      });
      try {
        uploader.onProgress((e) =>
          setProgress(Math.round((e.uploadedBytes * 100) / e.totalBytes))
        );

        const res: VideoUploadResponse = await uploader.upload();
        setVideo(res);
        setStatus({
          ingested: true,
          encoded: false,
        });
        setIsUploading(false);
        updateData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div onClick={openFilePicker}>
      <Button startIcon={<Plus />} loading={isUploading}>
        {isUploading ? `Upload a video ${progress}%` : `Upload a video`}
      </Button>
      <input
        type="file"
        id="upload"
        ref={inputFile}
        name="upload"
        onChange={(e) => fileInputChange(e)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadButton;
