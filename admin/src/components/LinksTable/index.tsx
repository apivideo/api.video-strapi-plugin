import React, { useState, ChangeEvent, FC } from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Box } from "@strapi/design-system/Box";
import Plus from "@strapi/icons/Plus";
import Link from "@strapi/icons/Link";

import { CustomBadge, Title } from "../../styles/form";
import { CustomAssets, InputDataMetadata } from "../../../../types";
import { SubTitleMetadata } from "../Metadata/style";
import { copyClipboard } from "../../utils";

interface LinksProps {
  assets: CustomAssets;
}

const LinksTable: FC<LinksProps> = ({ assets }) => {
  const COL_COUNT = 4;
  const ROW_COUNT = 2;

  return (
    <>
      <Title style={{ marginTop: "20px" }}>Links</Title>
      <SubTitleMetadata>
        A list of links you can copy by clicking on the copy button.
      </SubTitleMetadata>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Type</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Link</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Copy</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(assets).map((links, index) => (
            <Tr key={index}>
              <Td>
                <Typography textColor="neutral800">{links[0]}</Typography>
              </Td>
              <Td
                style={{
                  flex: "1",
                  overflow: "hidden",
                  maxWidth: "50ch",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography textColor="neutral800">{links[1]}</Typography>
              </Td>
              <Td>
                <Flex justifyContent={"flex-end"}>
                  <IconButton
                    onClick={() => copyClipboard(links[1])}
                    label={"Copy"}
                    noBorder
                    icon={<Link />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default LinksTable;
