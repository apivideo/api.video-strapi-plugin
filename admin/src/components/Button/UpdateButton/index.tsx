import React, { useEffect, useRef, useState, FC } from "react";
import { VideoUploader, VideoUploadResponse } from "@api.video/video-uploader";
import assetRequest from "../../../api/assets";
import { Button } from "@strapi/design-system/Button";
import { ProgressBar } from "@strapi/design-system/ProgressBar";
import { useNotification } from "@strapi/helper-plugin";

import CloudUpload from "@strapi/icons/CloudUpload";

export interface IUpdateButtonProps {
  title: string;
  description: string;
  tags: string[];
  metadata: { key: string; value: string }[];
  id: number;
  videoId: string;
  update: () => void;
  close: () => void;
}

const UpdateButton: FC<IUpdateButtonProps> = ({
  title,
  description,
  tags,
  metadata,
  id,
  videoId,
  update,
  close,
}): JSX.Element => {
  const [isUploading, setIsUploading] = useState(false);

  const notification = useNotification();

  const updateData = async () => {
    const body = {
      title: title,
      description: description,
      tags: tags,
      metadata: metadata,
    };
    setIsUploading(true);

    try {
      const data = await assetRequest.update(id, videoId, body);
      // const body = {
      //   title: res.title,
      //   description: res.description,
      //   videoId: res.videoId,
      //   mp4: res?.assets?.mp4,
      //   thumbnail: res?.assets?.thumbnail,
      //   tags: res.tags,
      //   metadata: res.metadata,
      // };
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
  };

  return <Button onClick={updateData}>Update</Button>;
};

export default UpdateButton;
