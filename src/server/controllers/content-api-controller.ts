import { factories } from '@strapi/strapi'
import pluginId from '../../admin/pluginId'

const model = `plugin::${pluginId}.api-video-asset`

export default factories.createCoreController('plugin::api-video-uploader.api-video-asset', ({ strapi }) => ({
    async count(ctx) {
        return await strapi.entityService.count(model, ctx.query)
    },
}))
