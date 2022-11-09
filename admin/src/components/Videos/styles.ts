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
  height: calc(100% - 56px);
  padding: 4rem 4rem 4rem 2rem;
  @media (max-width: 520px) {
    padding: 4rem 2rem;
  }
  overflow: auto;
`;

// export const CustomVideos = styled.video`
//   aspect-ratio: 16 / 9;
//   width: 100%;
//   max-width: 600px;
//   display: none;
//   border-radius: 4px;
// `;

export const Thumbnail = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  position: relative;
  cursor: pointer;
  display: block;
  border-radius: 4px;
`;

export const DeleteIcon = styled(IconButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
`;

export const WrapperVideo = styled.div`
  cursor: pointer;
  transition: transform 0.5s ease;
  width: 100%;
  max-width: 600px;

  &:hover {
    transform: scale(1.02);
  }

  &:hover ${DeleteIcon} {
    display: block;
    transition: all 2.5s ease;
  }
`;

export const SubInformationsWrapper = styled.div`
  display: flex;
  margin-top: 1.2rem;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 1.2rem;
  width: calc(100%-52px);
`;

export const Title = styled.p`
  font-weight: 500;
  color: #030303;
  font-size: 1.4rem;
  line-height: 2rem;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 0.8rem;
`;

export const SubTitle = styled.p`
  color: #606060;
  font-size: 1.2rem;
`;
