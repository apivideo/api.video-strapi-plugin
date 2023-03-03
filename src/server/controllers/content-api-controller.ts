import { factories } from '@strapi/strapi'
import pluginId from '../../admin/pluginId'
import { CustomVideo } from '../../types'
import { replacePrivateVideoTokens } from '../utils/private-videos'

const model = `plugin::${pluginId}.api-video-asset`

export const findOneWithPrivateVideoTransform = async (id: string, ctx?: any) => {
    const video = await strapi.entityService.findOne(model, id, ctx?.query)

    if (!video) {
        return null
    }

    video._public = video._public ?? true;

    return video._public
        ? video
        : await replacePrivateVideoTokens(video);
}

export const findWithPrivateVideoTransform = async (ctx?: any) => {
    const videos = await strapi.entityService.findMany(model, ctx?.query)


    return await Promise.all(videos
        .map((video: CustomVideo) => ({
            ...video,
            _public: video._public ?? true,
        }))
        .map(async (video: CustomVideo) => video._public
            ? video
            : await replacePrivateVideoTokens(video)));
}

export default factories.createCoreController('plugin::api-video-uploader.api-video-asset', ({ strapi }) => ({
    async count(ctx) {
        return await strapi.entityService.count(model, ctx.query)
    },
    async find(ctx) {
        return await findWithPrivateVideoTransform(ctx);
    },
    async findOne(ctx) {
        return await findOneWithPrivateVideoTransform(ctx.params.id, ctx.query) ?? ctx.notFound()
    }
}))
