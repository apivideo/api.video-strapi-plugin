import { Strapi, factories } from '@strapi/strapi'
import pluginId from '../../admin/pluginId'
import { configClient } from '../utils/config'
import { CustomVideo } from '../../types/index'

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

    async create(data: any) {
        try {
            await strapi.entityService.create(model, { data: data })
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
            await client.videos.update(videoId, data)
            await strapi.entityService.update(model, id, { data: data })
            return true
        } catch (error) {
            return false
        }
    },
}))
