import styled from 'styled-components'
import { IconButton } from '@strapi/design-system/IconButton'

export const GridBroadcastWrapper = styled.div`
    padding: 10px;
`

export const DeleteIcon = styled(IconButton)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background: #212134;
    border: 1px solid #32324d;
    cursor: pointer;
    box-shadow: 1px 1px 10px rgba(3,3,5,0.2);

    &:hover ${DeleteIcon} {
        display: block;
    }
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

export const WrapperVideo = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 10.25rem;
    overflow: hidden;
    background: repeating-conic-gradient(#181826 0% 25%,transparent 0% 50%) 50% / 20px 20px;
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
`

export const Title = styled.p<{ dark: boolean }>`
    font-size: .75rem;
    line-height: 1.33;
    font-weight: 600;
    color: ${p => p.dark ? '#ffffff' : '#32324d'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
`

export const SubTitle = styled.p`
    color: #606060;
    font-size: .70rem;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`
export const DateStyle = styled.p`
    color: #666687;
    font-size: .70rem;
    margin-top: 10px;
`
