import React, { useState, ChangeEvent, FC } from 'react'
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table'
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout'
import { Box } from '@strapi/design-system/Box'
import { Button } from '@strapi/design-system/Button'
import { Typography } from '@strapi/design-system/Typography'
import { TextInput } from '@strapi/design-system/TextInput'
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden'
import { Flex } from '@strapi/design-system/Flex'
import { IconButton } from '@strapi/design-system/IconButton'
import Plus from '@strapi/icons/Plus'
import Trash from '@strapi/icons/Trash'
import { CustomBadge, SubTitle, Title } from '../../styles/form'
import { InputDataMetadata } from '../../../types'
import { useTheme } from '../../utils/hooks'

interface MetadataTableProps {
    metadata?: {
        key: string
        value: string
    }[]
    handleSetMetadata: (metadata: InputDataMetadata) => void
    handleRemoveMetadata: (metadata: InputDataMetadata) => void
    editable: boolean
}

const MetadataTable: FC<MetadataTableProps> = ({ metadata, handleSetMetadata, handleRemoveMetadata, editable }) => {
    const [inputData, setInputData] = useState<InputDataMetadata>({
        key: '',
        value: '',
    })
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const { key, value } = inputData
    const theme = useTheme()

    const clearInputData = () => setInputData({ key: '', value: '' })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }))
    }

    const saveMetadata = () => {
        handleSetMetadata({
            key: key,
            value: value,
        })
        closeModal()
    }

    const closeModal = () => {
        setModalIsVisible(false)
        clearInputData()
    }

    return (
        <>
            <Title dark={theme === 'dark'}>
                Metadata
                <CustomBadge active={metadata?.length !== 0}>{metadata?.length}</CustomBadge>
            </Title>
            <SubTitle>
                A list of key value pairs that you use to provide metadata for your video.
            </SubTitle>
            <Table 
                colCount={5} 
                rowCount={2} 
                footer={<TFooter onClick={() => setModalIsVisible(true)} icon={<Plus />}>Add another metadata to this video</TFooter>}
            >
                <Thead>
                    <Tr>
                        <Th>
                            <Typography variant="sigma">Id</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Key</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Value</Typography>
                        </Th>

                        <Th>
                            <VisuallyHidden>Actions</VisuallyHidden>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {metadata?.map((entry, index) => (
                        <Tr key={index}>
                            <Td>
                                <Typography textColor="neutral800">{index + 1}</Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">{entry.key}</Typography>
                            </Td>
                            <Td style={{ flex: '1' }}>
                                <Typography textColor="neutral800">{entry.value}</Typography>
                            </Td>
                            <Td>
                                {editable && (
                                    <Flex justifyContent={'flex-end'}>
                                        <IconButton
                                            disabled={index === 0}
                                            onClick={() => handleRemoveMetadata(entry)}
                                            label={index === 0 ? "Default value, can't be deleted" : 'Delete'}
                                            noBorder
                                            icon={<Trash />}
                                        />
                                    </Flex>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {modalIsVisible && (
                <ModalLayout onClose={closeModal} labelledBy="title">
                    <ModalHeader>
                        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                            Video metadata
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                    <Flex gap={3}>
                        <Box grow='1'>
                            <TextInput placeholder="Metadata key" label="Key" name="key" onChange={handleChange} value={key} />
                        </Box>
                        <Box grow='1'>
                            <TextInput placeholder="Metadata value" label="Value" name="value" onChange={handleChange} value={value} />
                        </Box>
                    </Flex>
                    </ModalBody>
                    <ModalFooter
                        startActions={
                            <Button onClick={closeModal} variant="tertiary">
                                Cancel
                            </Button>
                        }
                        endActions={
                            <Button onClick={saveMetadata}>Save</Button>
                        }
                    />
                </ModalLayout>
            )}
        </>
    )
}

export default MetadataTable
