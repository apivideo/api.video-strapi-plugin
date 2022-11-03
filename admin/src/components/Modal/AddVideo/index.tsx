import React, { FC, useState, useRef, ChangeEvent } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import FieldComp from "../../FieldComp/Fields";
import UploadButton from "../../UploadButton";

interface IAddVideoModalProps {
  close: () => void;
  update: () => void;
}

const AddVideoModal: FC<IAddVideoModalProps> = ({
  update,
  close,
}): JSX.Element => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | undefined>();

  // CONSTANTS
  const inputFile = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    if (file) {
      setFile(undefined);
    }
    inputFile && inputFile?.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const fileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      setFile(files[0]);
    }
  };

  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Upload a video
        </Typography>
      </ModalHeader>
      <ModalBody>
        <FieldComp
          name="title"
          label="Title"
          value={title}
          placeholder="Enter your title"
          onChange={handleChange}
        />
        <Button variant="secondary" onClick={openFilePicker}>
          import
        </Button>
        <input
          type="file"
          id="upload"
          ref={inputFile}
          name="upload"
          onChange={(e) => fileInputChange(e)}
          style={{ display: "none" }}
        />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <UploadButton
              currentFile={file}
              title={title}
              update={update}
              close={close}
            />
          </>
        }
      />
    </ModalLayout>
  );
};

export default AddVideoModal;
