/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect, useMemo } from 'react'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { Layout, ContentLayout, BaseHeaderLayout } from '@strapi/design-system/Layout'

import { GridBroadcast } from '../../components/Videos/styles'
import assetsRequests from '../../api/assets'
import VideoView from '../../components/Videos'
import settingsRequests from '../../api/settings'
import SetupNeeded from '../../components/SetupNeeded'
import EmptyState from '../../components/EmptyState'
import { CustomVideo } from '../../../types'
import AddButton from '../../components/Button/AddButton'
import SearchBar from '../../components/SearchBar'
import { CheckPagePermissions, useRBAC } from '@strapi/helper-plugin'
import pluginPermissions from '../../permissions'

const HomePage = () => {
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [isLoadingConfiguration, setIsLoadingConfiguration] = useState(false)
    const [isConfigurated, setIsConfigurated] = useState(false)
    const [assets, setAssets] = useState<CustomVideo[]>([])
    const [search, setSearch] = useState('')

    const permissions = useMemo(() => {
        return {
            read: pluginPermissions.mainRead,
            create: pluginPermissions.mainCreate,
            delete: pluginPermissions.mainDelete,
            update: pluginPermissions.mainUpdate,
            updateSettings: pluginPermissions.settingsUpdate,
        }
    }, [])

    const {
        isLoading: isLoadingPermissions,
        allowedActions: { canRead, canCreate, canDelete, canUpdate, canUpdateSettings },
    } = useRBAC(permissions)

    const fetchData = async () => {
        if (isLoadingData === false) setIsLoadingData(true)
        const data = await assetsRequests.getAllvideos()
        setIsLoadingData(false)
        setAssets(data)
    }

    const getApiKey = async () => {
        setIsLoadingConfiguration(true)
        const settings = await settingsRequests.get()
        setIsConfigurated(settings?.apiKey?.length > 0)
        setIsLoadingConfiguration(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        getApiKey()
    }, [])

    const handleSearch = (value: string) => {
        setSearch(value)
    }
    if (isLoadingConfiguration || isLoadingPermissions) return <LoadingIndicatorPage />

    return (
        <Layout>
            <BaseHeaderLayout
                title="api.video uploader"
                subtitle="Upload to and manage your api.video library directly within Strapi"
                as="h2"
                primaryAction={isConfigurated && canCreate && <AddButton update={fetchData} />}
            />
            <ContentLayout>
                {isConfigurated ? (
                    !isLoadingData && assets?.length > 0 ? (
                        <>
                            <SearchBar
                                search={search}
                                handleSearch={(query) => handleSearch(query)}
                                clearSearch={() => setSearch('')}
                            />
                            <GridBroadcast>
                                {assets
                                    .filter((item) => item.title.includes(search))
                                    .map((video) => {
                                        const { videoId } = video
                                        return (
                                            <VideoView
                                                video={video}
                                                key={videoId}
                                                updateData={fetchData}
                                                editable={canUpdate}
                                                deletable={canDelete}
                                            />
                                        )
                                    })}
                            </GridBroadcast>
                        </>
                    ) : (
                        <EmptyState update={fetchData} />
                    )
                ) : (
                    <SetupNeeded />
                )}
            </ContentLayout>
        </Layout>
    )
}

export default () => (
    <CheckPagePermissions permissions={pluginPermissions.mainRead}>
        <HomePage />
    </CheckPagePermissions>
)
