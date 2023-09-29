import styled from 'styled-components'
import { IconButton } from '@strapi/design-system/IconButton'

export const GridBroadcastWrapper = styled.div`
    padding: 10px;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background: #212134;
    border: 1px solid #32324d;
`

export const GridBroadcast = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    width: 100%;
    padding: 20px 0;
    overflow: auto;
`

export const Thumbnail = styled.img`
    width: fit-content;
    height: 100%;
`

export const DeleteIcon = styled(IconButton)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
`

export const WrapperVideo = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 10.25rem;
    overflow: hidden;
    border-radius: 4px;
    background: repeating-conic-gradient(#181826 0% 25%,transparent 0% 50%) 50% / 20px 20px;

    &:hover ${DeleteIcon} {
        display: block;
    }
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.p<{ dark: boolean }>`
    margin-top: 5px;
    font-weight: 500;
    color: ${p => p.dark ? '#ffffff' : '#32324d'};
    font-size: 18px;
    line-height: 2rem;
    min-width: 250px;
    max-width: 600px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const SubTitle = styled.p`
    color: #606060;
    font-size: 14px;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`
export const DateStyle = styled.p`
    color: #666687;
    font-size: 12px;
    margin-top: 10px;
`
