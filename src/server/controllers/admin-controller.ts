import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async createVideoId(ctx: any) {
        try {
            return await strapi.plugin('api-video-uploader').service('api-video-asset').createVideoId(ctx.request.body)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async create(ctx: any) {
        try {
            ctx.body = await strapi.plugin('api-video-uploader').service('api-video-asset').create(ctx.request.body)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async findAll(ctx: any) {
        try {
            ctx.body = await strapi.plugin('api-video-uploader').service('api-video-asset').findAll(ctx.request.body)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async update(ctx: any) {
        try {
            ctx.body = await strapi
                .plugin('api-video-uploader')
                .service('api-video-asset')
                .update(ctx.params.id, ctx.params.videoId, ctx.request.body)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async delete(ctx: any) {
        try {
            return await strapi
                .plugin('api-video-uploader')
                .service('api-video-asset')
                .delete(ctx.params.id, ctx.params.videoId)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
})
