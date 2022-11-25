import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getConfig(ctx: any) {
        try {
            return await strapi.plugin('api-video-uploader').service('settings').getConfig(ctx)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async saveConfig(ctx: any) {
        try {
            return await strapi.plugin('api-video-uploader').service('settings').saveConfig(ctx)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
})
