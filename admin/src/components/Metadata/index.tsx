import React, { useState, ChangeEvent, useRef, FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  TFooter,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Box } from "@strapi/design-system/Box";

import Plus from "@strapi/icons/Plus";
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";

import {
  AddButton,
  FooterAction,
  FormKey,
  FormValue,
  SubTitleMetadata,
  ValueMetadataInput,
} from "./style";
import { CustomBadge, SubTitle, Title, FormInput } from "../../styles/form";
import { InputDataMetadata } from "../../../../types";

interface MetadataTableProps {
  metadata?: {
    key: string;
    value: string;
  }[];
  handleSetMetadata: (metadata: InputDataMetadata) => void;
  handleRemoveMetadata: (metadata: InputDataMetadata) => void;
}

const MetadataTable: FC<MetadataTableProps> = ({
  metadata,
  handleSetMetadata,
  handleRemoveMetadata,
}) => {
  const [inputData, setInputData] = useState<InputDataMetadata>({
    key: "",
    value: "",
  });

  const { key, value } = inputData;

  const COL_COUNT = 5;
  const ROW_COUNT = 2;

  const addElement = () => {
    handleSetMetadata({
      key: key,
      value: value,
    });
    setInputData({ key: "", value: "" });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  };

  return (
    <>
      <Title>
        Metadata
        <CustomBadge active={metadata?.length !== 0}>
          {metadata?.length}
        </CustomBadge>
      </Title>
      <SubTitleMetadata>
        A list of key value pairs that you use to provide metadata for your
        video.
      </SubTitleMetadata>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Id</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Key</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Value</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {metadata?.map((entry, index) => (
            <Tr key={index}>
              <Td>
                <Typography textColor="neutral800">{index + 1}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.key}</Typography>
              </Td>
              <Td style={{ flex: "1" }}>
                <Typography textColor="neutral800">{entry.value}</Typography>
              </Td>
              <Td>
                <Flex justifyContent={"flex-end"}>
                  <IconButton
                    onClick={() => handleRemoveMetadata(entry)}
                    label="Delete"
                    noBorder
                    icon={<Trash />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <FooterAction>
        <FormKey
          name="key"
          value={key}
          placeholder="Add a key"
          onChange={handleChange}
        ></FormKey>

        <FormValue
          name="value"
          value={value}
          placeholder="Add a value"
          onChange={handleChange}
        ></FormValue>
        <AddButton onClick={addElement} label="add" noBorder icon={<Plus />} />
      </FooterAction>
    </>
  );
};

export default MetadataTable;
