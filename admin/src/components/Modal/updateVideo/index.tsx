import React, { FC, useState, ChangeEvent } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import FieldComp from "../../FieldComp/Fields";
import Tags from "../../Tags";
import { CustomVideo, InputData } from "../../../../../types";
import MetadataTable from "../../Metadata";
import PlayerView from "./PlayerView";
import UpdateButton from "../../Button/UpdateButton";

interface IUpdateVideoModalProps {
  video: CustomVideo;
  update: () => void;
  close: () => void;
}

const UpdateVideoModal: FC<IUpdateVideoModalProps> = ({
  video,
  update,
  close,
}): JSX.Element => {
  const [inputData, setInputData] = useState<InputData>({
    title: video.title,
    description: video.description,
    tags: video.tags,
    metadata: video.metadata,
  });

  // CONSTANTS
  const { title, description, tags, metadata } = inputData;

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

  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Update video
        </Typography>
      </ModalHeader>
      <ModalBody>
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
        endActions={
          <>
            <UpdateButton
              title={title}
              description={description || ""}
              tags={tags || []}
              metadata={metadata || []}
              id={video.id}
              videoId={video.videoId}
              update={update}
              close={close}
            />
          </>
        }
      />
    </ModalLayout>
  );
};

export default UpdateVideoModal;
