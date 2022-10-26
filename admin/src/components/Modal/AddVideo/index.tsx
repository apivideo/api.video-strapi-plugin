import React, { FC } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";

interface IAddVideoModalProps {
  close?: () => void;
}

const AddVideoModal: FC<IAddVideoModalProps> = ({ close }): JSX.Element => {
  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Title
        </Typography>
      </ModalHeader>
      <ModalBody>
        <p>add video</p>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <Button variant="secondary">Add new stuff</Button>
            <Button onClick={close}>Finish</Button>
          </>
        }
      />
    </ModalLayout>
  );
};

export default AddVideoModal;
