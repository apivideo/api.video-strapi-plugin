import { Strapi } from '@strapi/strapi'
import { isValidApiKey } from '../utils/config'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getConfig() {
        const pluginStore = strapi.store({
            environment: strapi.config.environment,
            type: 'plugin',
            name: 'api-video-uploader',
        })

        const configKey = await pluginStore.get({
            key: 'apiKey',
        })
        return JSON.stringify(configKey)
    },
    async saveConfig(ctx: any) {
        const req = ctx.request.body
        const pluginStore = strapi.store({
            environment: strapi.config.environment,
            type: 'plugin',
            name: 'api-video-uploader',
        })

        try {
            const isValid = await isValidApiKey(req.apiKey)
            if (isValid) {
                await pluginStore.set({
                    key: 'apiKey',
                    value: req.apiKey,
                })
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    },
})
