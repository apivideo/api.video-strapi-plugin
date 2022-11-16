import React, { FC } from "react";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Button } from "@strapi/design-system/Button";
import { Stack } from "@strapi/design-system/Stack";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import Trash from "@strapi/icons/Trash";
import styled from "styled-components";

interface IDialogDelete {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  deleteVideo: () => void;
}

const DialogDelete: FC<IDialogDelete> = ({
  title,
  isOpen,
  setIsOpen,
  deleteVideo,
}) => {
  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      title="Confirmation"
      isOpen={isOpen}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description" textAlign={"center"}>
              Are you sure you want to delete the video named{" "}
              <Title>{title}</Title>.?
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setIsOpen(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            variant="danger-light"
            startIcon={<Trash />}
            onClick={deleteVideo}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default DialogDelete;

const Title = styled.span`
  font-weight: bold;
`;
