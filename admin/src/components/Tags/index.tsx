import React, { FC, useState } from "react";
import { Container, SubTitle, TagsInput, Title, CustomBadge } from "./style";
import { Tag } from "@strapi/design-system/Tag";
import Cross from "@strapi/icons/Cross";

interface ITag {
  tags: string[];
  handleSetTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
}

const Tags: FC<ITag> = ({ tags, handleSetTag, handleRemoveTag }) => {
  const [tag, setTag] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = tag.trim();
    const hasValue = value.length > 0;
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      e.preventDefault();
      if (!hasValue) return;
      if (tags.some((item) => item === value)) {
        return;
      }
      handleSetTag(value);
      setTag("");
    }
  };
  return (
    <>
      <Title>
        Tags
        <CustomBadge active={tags.length > 0}>{tags.length}</CustomBadge>
      </Title>
      <SubTitle>
        A list of tags you want to use to describe your video.
      </SubTitle>
      <Container>
        <TagsInput
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></TagsInput>

        {tags.map((item) => {
          return (
            <Tag
              key={item}
              onClick={() => handleRemoveTag(item)}
              icon={<Cross aria-hidden={true} />}
            >
              {item}
            </Tag>
          );
        })}
      </Container>
    </>
  );
};

export default Tags;
