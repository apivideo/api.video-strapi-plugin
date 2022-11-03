import React, { useEffect, useRef, useState, FC } from "react";
// import styles from './upload.module.css'
import { VideoUploader, VideoUploadResponse } from "@api.video/video-uploader";
import assetRequest from "../../api/assets";
import { Button } from "@strapi/design-system/Button";
import { ProgressBar } from "@strapi/design-system/ProgressBar";
import { useNotification } from "@strapi/helper-plugin";

import CloudUpload from "@strapi/icons/CloudUpload";

export interface IUploadButtonProps {
  currentFile: File | undefined;
  title: string;
  update: () => void;
  close: () => void;
}

const UploadButton: FC<IUploadButtonProps> = ({
  currentFile,
  title,
  update,
  close,
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const notification = useNotification();

  const fileInputChange = async () => {
    const body = { title: title };
    const { newVideo, token } = await assetRequest.createVideoId(body);
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

        // const res: VideoUploadResponse = await uploader.upload();
        const res: any = await uploader.upload();
        const body = {
          title: res.title,
          videoId: res.videoId,
          mp4: res?.assets?.mp4,
          thumbnail: res?.assets?.thumbnail,
        };
        const data = await assetRequest.create(body);
        if (data) {
          setIsUploading(false);
          update();
          close();
        } else {
          notification({
            type: "warning",
            message: "Error while creating video",
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Button
      endIcon={<CloudUpload />}
      loading={isUploading}
      onClick={fileInputChange}
      disabled={currentFile === undefined}
    >
      {isUploading ? `Uploading ${progress}%` : `Upload`}
    </Button>
  );
};

export default UploadButton;
