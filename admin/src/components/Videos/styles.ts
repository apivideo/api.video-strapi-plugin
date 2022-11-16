import styled from "styled-components";
import { IconButton } from "@strapi/design-system/IconButton";

export const GridBroadcastWrapper = styled.div`
  padding: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GridBroadcast = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 16px;
  width: 100%;
  padding: 20px 0;
  overflow: auto;
`;

export const Thumbnail = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: 0.2s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

export const DeleteIcon = styled(IconButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.2s ease;
`;

export const WrapperVideo = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border-radius: 4px;

  &:hover ${Thumbnail} {
    filter: brightness(0.9);
    transform: scale(1.1);
  }

  &:hover ${DeleteIcon} {
    display: block;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 5px;
`;

export const Title = styled.p`
  font-weight: 500;
  color: #32324d;
  font-size: 18px;
  line-height: 2rem;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const SubTitle = styled.p`
  color: #606060;
  font-size: 14px;
  font-style: italic;
`;
export const DateStyle = styled.p`
  color: #666687;
  font-size: 12px;
`;
