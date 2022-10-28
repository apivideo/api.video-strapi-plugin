import React, { useEffect, useRef, useState, FC } from "react";
// import styles from './upload.module.css'
import { VideoUploader, VideoUploadResponse } from "@api.video/video-uploader";
import assetRequest from "../../api/assets";
import { Button } from "@strapi/design-system/Button";
import { ProgressBar } from "@strapi/design-system/ProgressBar";

import Plus from "@strapi/icons/Plus";

export interface IUploadButtonProps {
  currentFile: File | undefined;
}

const UploadButton: FC<IUploadButtonProps> = ({ currentFile }): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [video, setVideo] = useState<VideoUploadResponse | undefined>(
    undefined
  );

  const fileInputChange = async () => {
    const { newVideo, token } = await assetRequest.createVideoId();
    if (currentFile) {
      setIsUploading(true);
      const uploader = new VideoUploader({
        file: currentFile,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        videoId: newVideo.videoId,
      });
      try {
        uploader.onProgress((e) =>
          setProgress(Math.round((e.uploadedBytes * 100) / e.totalBytes))
        );

        const res: VideoUploadResponse = await uploader.upload();
        const body = { title: res.title, videoId: res.videoId };
        const data = await assetRequest.create(body);

        console.log(data, "data");
        setVideo(res);
        setIsUploading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Button
      startIcon={<Plus />}
      loading={isUploading}
      onClick={fileInputChange}
    >
      {isUploading ? `Upload a video ${progress}%` : `Upload a video`}
    </Button>
  );
};

export default UploadButton;
