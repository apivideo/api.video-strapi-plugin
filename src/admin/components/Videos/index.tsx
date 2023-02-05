import React, { useState, useEffect, FC } from 'react'
import Trash from '@strapi/icons/Trash'
import assetsRequests from '../../api/assets'
import { getDayMonthYearHourDate } from '../../utils/date'
import UpdateVideoModal from '../Modal/updateVideo'
import DialogDelete from '../Dialog'
import { WrapperVideo, Thumbnail, TitleWrapper, Title, DateStyle, SubTitle, Container, DeleteIcon } from './styles'
import { VideoCover } from '../../assets/VideoCover'
import { CustomVideo } from '../../../types'

export interface IVideosProps {
    video: CustomVideo
    updateData: () => void
    editable: boolean
    deletable: boolean
}

const VideoView: FC<IVideosProps> = ({ video, updateData, deletable, editable }): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [token, setToken] = useState(undefined)
    const [isGettingToken, setIsGettingToken] = useState(true)

    let { id, videoId, title, description, _public, thumbnail, mp4, createdAt } = video

    const deleteVideo = async () => {
        await assetsRequests.delete(id, videoId)
        setIsDeleteDialogOpen(false)
        updateData()
    }

    const openDeleteDialog = (e: React.ChangeEvent<any>) => {
        e.stopPropagation()
        setIsDeleteDialogOpen(true)
    }
    const formatedCreatedAt = getDayMonthYearHourDate(createdAt)

    const getToken = async () => {
        const tokenResponse = await assetsRequests.getToken(videoId)
        setToken(tokenResponse.token)
        setIsGettingToken(false)
    }

    useEffect(() => {
        getToken()
    }, [])

    if (!_public && thumbnail.includes('token')){
        thumbnail = thumbnail.substring(0, thumbnail.indexOf('token')) + `token/${token}/thumbnail.jpg`
    }

    return (
        <Container>
            <WrapperVideo onClick={() => setIsModalOpen(true)}>
                {!isGettingToken ? (
                    <Thumbnail src={thumbnail} alt={'thumbnail'} />
                ) : (<VideoCover />)}
                {deletable && <DeleteIcon onClick={openDeleteDialog} aria-label="Delete" icon={<Trash />} />}
            </WrapperVideo>

            <TitleWrapper>
                <Title>{title}</Title>
                <SubTitle>{description}</SubTitle>
                <DateStyle>{formatedCreatedAt}</DateStyle>
            </TitleWrapper>

            {isModalOpen && (
                <UpdateVideoModal
                    video={video}
                    update={updateData}
                    editable={editable}
                    close={() => setIsModalOpen(false)}
                />
            )}
            {isDeleteDialogOpen && (
                <DialogDelete
                    title={title}
                    isOpen={isDeleteDialogOpen}
                    close={() => setIsDeleteDialogOpen(false)}
                    deleteVideo={deleteVideo}
                />
            )}
        </Container>
    )
}

export default VideoView
