import { factories, Strapi } from '@strapi/strapi'
import pluginId from '../../admin/pluginId'
import { CustomVideo } from '../../types'
import { configClient } from '../utils/config'
import { replacePrivateVideoTokens } from '../utils/private-videos'

const model = `plugin::${pluginId}.api-video-asset`

export default factories.createCoreService<any>(model, (params: { strapi: Strapi }) => ({
    async createVideoId(data: any) {
        const client = await configClient()
        const newVideo = await client.videos.create({
            title: data['title'],
            description: data['description'],
            _public: data['_public'],
            tags: data['tags'],
            metadata: data['metadata'],
        })
        const token = await client.getAccessToken()
        return { newVideo, token }
    },

    async findAll(query: any) {
        return await strapi.entityService.findMany(model, query)
    },

    async token(videoId: string) {
        const client = await configClient()
        
        const video = await client.videos.get(videoId)

        return {token: video?._public ? undefined : video.assets?.player?.split('=')[1]}
    },

    async create(data: CustomVideo) {
        try {
            if(!data._public) {
                data = await replacePrivateVideoTokens(data, '11111111-1111-1111-1111-111111111111')
            }
            await strapi.entityService.create(model, { data })
            return true
        } catch (error) {
            return false
        }
    },

    async delete(id: string, videoId: string): Promise<boolean> {
        const client = await configClient()
        try {
            await client.videos.delete(videoId)
            await strapi.entityService.delete(model, id)
            return true
        } catch (error) {
            return false
        }
    },

    async update(id: string, videoId: string, data: any) {
        const client = await configClient()
        try {
            const updatedVideo = await client.videos.update(videoId, data)
            let customVideo =  {
                title: updatedVideo.title,
                description: updatedVideo.description,
                _public: updatedVideo._public,
                videoId: updatedVideo.videoId,
                hls: updatedVideo.assets?.hls,
                iframe: updatedVideo.assets?.iframe,
                mp4: updatedVideo?.assets?.mp4,
                player: updatedVideo.assets?.player,
                thumbnail: updatedVideo?.assets?.thumbnail,
                tags: updatedVideo.tags,
                metadata: updatedVideo.metadata,
            } as CustomVideo;
            if(!customVideo._public) {
                customVideo = await replacePrivateVideoTokens(customVideo, '11111111-1111-1111-1111-111111111111')
            }
            const res = await strapi.entityService.update(model, id, { data: customVideo })
            return res;
        } catch (error) {
            return false
        }
    },
}))
