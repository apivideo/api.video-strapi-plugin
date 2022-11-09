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
import Tags from "../../Tags";
import { CustomVideo, InputData } from "../../../../../types";
import MetadataTable from "../../Metadata";
import PlayerView from "./PlayerView";

interface IUpdateVideoModalProps {
  video: CustomVideo;
}

const UpdateVideoModal: FC<IUpdateVideoModalProps> = ({
  video,
}): JSX.Element => {
  const [inputData, setInputData] = useState<InputData>({
    title: video.title,
    description: video.description,
    tags: video.tags,
    metadata: video.metadata,
  });

  const [file, setFile] = useState<File | undefined>();
  const [initialState, setInitialState] = useState<number>(0);

  // CONSTANTS
  const inputFile = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const { title, description, tags, metadata } = inputData;

  const openFilePicker = () => {
    if (file) {
      setFile(undefined);
    }
    inputFile && inputFile?.current?.click();
  };

  const displayVideoFrame = (
    video: HTMLVideoElement,
    source: HTMLSourceElement,
    file: File
  ) => {
    // Object Url as the video source
    source.setAttribute("src", URL.createObjectURL(file));
    // Load the video and show it
    video.load();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  };

  const handleSetTag = (tag: string) => {
    if (tag) {
      setInputData({ ...inputData, tags: [...(inputData.tags || []), tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = inputData.tags && inputData.tags.filter((t) => t !== tag);
    setInputData({ ...inputData, tags: newTags });
  };

  const handleSetMetadata = (metadata: any) => {
    if (metadata) {
      setInputData({
        ...inputData,
        metadata: [...(inputData.metadata || []), metadata],
      });
    }
  };

  const handleRemoveMetadata = (metadata: Object) => {
    const newMetadata =
      inputData?.metadata && inputData?.metadata.filter((m) => m !== metadata);
    setInputData({ ...inputData, metadata: newMetadata });
  };

  const fileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
      setInputData((prevInputData) => ({
        ...prevInputData,
        title: files[0].name,
      }));
      if (initialState === 0) {
        setInitialState(1);
      }
      if (videoRef.current && sourceRef.current)
        displayVideoFrame(videoRef.current, sourceRef.current, files[0]);
    }
  };

  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Update video
        </Typography>
      </ModalHeader>
      <ModalBody>
        {/* <ImportZone
          initialState={initialState}
          openFilePicker={openFilePicker}
          videoRef={videoRef}
          sourceRef={sourceRef}
        /> */}
        <PlayerView video={video} />
        <FieldComp
          name="title"
          label="Title"
          value={title}
          placeholder="Enter your title"
          onChange={handleChange}
          required
        />
        <br />
        <FieldComp
          name="description"
          label="Description"
          value={description || ""}
          placeholder="Enter a description"
          onChange={handleChange}
        />
        <br />
        <input
          type="file"
          id="upload"
          accept={"video/*"}
          ref={inputFile}
          name="upload"
          onChange={(e) => fileInputChange(e)}
          style={{ display: "none" }}
        />

        <Tags
          handleSetTag={handleSetTag}
          handleRemoveTag={handleRemoveTag}
          tags={tags || []}
        />

        <MetadataTable
          metadata={metadata}
          handleSetMetadata={handleSetMetadata}
          handleRemoveMetadata={handleRemoveMetadata}
        />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        // endActions={
        //   <>
        //     <UploadButton
        //       currentFile={file}
        //       title={title}
        //       description={description || ""}
        //       tags={tags || []}
        //       metadata={metadata || []}
        //       update={update}
        //       close={close}
        //     />
        //   </>
        // }
      />
    </ModalLayout>
  );
};

export default UpdateVideoModal;
