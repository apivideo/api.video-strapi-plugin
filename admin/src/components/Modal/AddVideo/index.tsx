import React, { FC, useState, useRef, ChangeEvent } from 'react'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout'
import { Button } from '@strapi/design-system/Button'
import { Typography } from '@strapi/design-system/Typography'
import FieldComp from '../../FieldComp/Fields'
import UploadButton from '../../Button/UploadButton'
import ImportZone from './importZone'
import Tags from '../../Tags'
import { InputData } from '../../../../../types'
import MetadataTable from '../../Metadata'

interface IAddVideoModalProps {
    close: () => void
    update: () => void
}

const AddVideoModal: FC<IAddVideoModalProps> = ({ update, close }): JSX.Element => {
    const [inputData, setInputData] = useState<InputData>({
        title: '',
        description: '',
        tags: [],
        metadata: [
            {
                key: 'Upload source',
                value: 'Strapi',
            },
        ],
    })

    const [file, setFile] = useState<File | undefined>()
    const [initialState, setInitialState] = useState<number>(0)

    // CONSTANTS
    const videoRef = useRef<HTMLVideoElement>(null)
    const sourceRef = useRef<HTMLSourceElement>(null)
    const { title, description, tags, metadata } = inputData

    const displayVideoFrame = (video: HTMLVideoElement, source: HTMLSourceElement, file: File) => {
        // Object Url as the video source
        source.setAttribute('src', URL.createObjectURL(file))
        // Load the video and show it
        video.load()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }))
    }

    const handleSetTag = (tag: string) => {
        if (tag) {
            setInputData({ ...inputData, tags: [...(inputData.tags || []), tag] })
        }
    }

    const handleRemoveTag = (tag: string) => {
        const newTags = inputData.tags && inputData.tags.filter((t) => t !== tag)
        setInputData({ ...inputData, tags: newTags })
    }

    const handleSetMetadata = (metadata: any) => {
        if (metadata) {
            setInputData({
                ...inputData,
                metadata: [...(inputData.metadata || []), metadata],
            })
        }
    }

    const handleRemoveMetadata = (metadata: Object) => {
        const newMetadata = inputData?.metadata && inputData?.metadata.filter((m) => m !== metadata)
        setInputData({ ...inputData, metadata: newMetadata })
    }

    const onFileSelected = (file: File) => {
        setFile(file)
        setInputData((prevInputData) => ({
            ...prevInputData,
            title: file.name,
        }))
        if (initialState === 0) {
            setInitialState(1)
        }
        if (videoRef.current && sourceRef.current) displayVideoFrame(videoRef.current, sourceRef.current, file)
    }

    return (
        <ModalLayout onClose={close} labelledBy="title">
            <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                    Upload a video
                </Typography>
            </ModalHeader>
            <ModalBody>
                <ImportZone
                    initialState={initialState}
                    onFileSelected={onFileSelected}
                    videoRef={videoRef}
                    sourceRef={sourceRef}
                />
                <FieldComp
                    name="title"
                    label="Title"
                    value={title}
                    placeholder="Enter your title"
                    onChange={handleChange}
                    required
                />
                <br />
                <FieldComp
                    name="description"
                    label="Description"
                    value={description || ''}
                    placeholder="Enter a description"
                    onChange={handleChange}
                />
                <br />

                <Tags handleSetTag={handleSetTag} handleRemoveTag={handleRemoveTag} tags={tags || []} editable={true} />

                <MetadataTable
                    metadata={metadata}
                    handleSetMetadata={handleSetMetadata}
                    handleRemoveMetadata={handleRemoveMetadata}
                    editable={true}
                />
            </ModalBody>
            <ModalFooter
                startActions={
                    <Button onClick={close} variant="tertiary">
                        Cancel
                    </Button>
                }
                endActions={
                    <>
                        <UploadButton
                            currentFile={file}
                            title={title}
                            description={description || ''}
                            tags={tags || []}
                            metadata={metadata || []}
                            update={update}
                            close={close}
                        />
                    </>
                }
            />
        </ModalLayout>
    )
}

export default AddVideoModal
