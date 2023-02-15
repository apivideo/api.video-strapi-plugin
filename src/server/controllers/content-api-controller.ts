import { factories } from '@strapi/strapi'
import pluginId from '../../admin/pluginId'
import { CustomVideo } from '../../types'
import { replacePrivateVideoTokens } from '../utils/private-videos'

const model = `plugin::${pluginId}.api-video-asset`


export default factories.createCoreController('plugin::api-video-uploader.api-video-asset', ({ strapi }) => ({
    async count(ctx) {
        return await strapi.entityService.count(model, ctx.query)
    },
    async find(ctx) {
        const videos = await strapi.entityService.findMany(model, ctx.query)
        
        return await Promise.all(videos.map(async (video: CustomVideo) => video._public 
            ? video 
            : await replacePrivateVideoTokens(video)));
    },
    async findOne(ctx) {
        const video = await strapi.entityService.findOne(model, ctx.params.id, ctx.query)
        
        if(!video) {
            return ctx.notFound()
        }

        return video._public
            ? video
            : await replacePrivateVideoTokens(video);
    }
}))
