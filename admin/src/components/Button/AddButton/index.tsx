import React, { useEffect, useRef, useState, FC } from "react";
// import styles from './upload.module.css'
import { VideoUploader, VideoUploadResponse } from "@api.video/video-uploader";
import { Button } from "@strapi/design-system/Button";
import { ProgressBar } from "@strapi/design-system/ProgressBar";

import Plus from "@strapi/icons/Plus";
import AddVideoModal from "../../Modal/AddVideo";

const AddButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button startIcon={<Plus />} onClick={() => setIsVisible(true)}>
        Upload
      </Button>
      {isVisible && <AddVideoModal close={() => setIsVisible(false)} />}
    </>
  );
};

export default AddButton;
