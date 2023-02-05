import React, { useEffect, useRef, useState, FC } from 'react'
import ApiVideoPlayer from '@api.video/react-player'
import styled from 'styled-components'
import { CustomVideo } from '../../../../types'
import assetsRequests from '../../../api/assets'

interface IPlayerViewProps {
    video: CustomVideo
}

const PlayerView: FC<IPlayerViewProps> = ({ video }) => {
    const [token, setToken] = useState(undefined)
    const [isGettingToken, setIsGettingToken] = useState(true)

    const videoRef = useRef<ApiVideoPlayer>(null)

    const { videoId } = video

    const getToken = async () => {
        const tokenResponse = await assetsRequests.getToken(videoId)
        setToken(tokenResponse.token)
        setIsGettingToken(false)
    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <Wrapper>
            {!isGettingToken && (
                <ApiVideoPlayer
                    video={video._public || !token ? { id: videoId } : { id: videoId, token: token }}
                    videoStyleObjectFit={'cover'}
                    ref={videoRef}
                    style={{
                        width: 'auto',
                        height: 300,
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}
                />
            )}
        </Wrapper>
    )
}

export default PlayerView

const Wrapper = styled.div`
    border-radius: 4px;
    padding-bottom: 10px;
`
