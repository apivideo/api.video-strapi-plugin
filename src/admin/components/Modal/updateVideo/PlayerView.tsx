import React, { useRef, FC } from 'react'
import ApiVideoPlayer from '@api.video/react-player'
import { CustomVideo } from '../../../../types'
import styled from 'styled-components'

interface IPlayerViewProps {
    video: CustomVideo
}

const PlayerView: FC<IPlayerViewProps> = ({ video }) => {
    const videoRef = useRef<ApiVideoPlayer>(null)

    const { videoId } = video

    return (
        <Wrapper>
            <ApiVideoPlayer
                video={{ id: videoId }}
                videoStyleObjectFit={'cover'}
                ref={videoRef}
                style={{
                    width: 'auto',
                    height: 300,
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
                autoplay
                loop
            />
        </Wrapper>
    )
}

export default PlayerView

const Wrapper = styled.div`
    border-radius: 4px;
    padding-bottom: 10px;
`
