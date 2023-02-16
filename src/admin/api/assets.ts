import { request } from '@strapi/helper-plugin'
import { InputData } from '../../types'
import pluginId from '../pluginId'

const assetsRequests = {
    getAllvideos: async () => {
        return await request(`/${pluginId}/api-video-asset`, {
            method: 'GET',
        })
    },
    getToken: async (videoId: string) => {
        return await request(`/${pluginId}/api-video-asset/token/${videoId}`, {
            method: 'GET',
        })
    },
    createVideoId: async (body: Object) => {
        return await request(`/${pluginId}/api-video-asset/create`, {
            method: 'POST',
            body,
        })
    },
    create: async (body: Object) => {
        return await request(`/${pluginId}/api-video-asset`, {
            method: 'POST',
            body,
        })
    },
    update: async (id: number, videoId: string, body: InputData) => {
        return await request(`/${pluginId}/api-video-asset/${id}/${videoId}`, {
            method: 'PUT',
            body,
        })
    },
    delete: async (id: number, videoId: string) => {
        return await request(`/${pluginId}/api-video-asset/${id}/${videoId}`, {
            method: 'DELETE',
        })
    },
}

export default assetsRequests
