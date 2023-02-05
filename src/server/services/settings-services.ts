import { Strapi } from '@strapi/strapi'
import { CustomSettings } from '../../types'
import { isValidApiKey } from '../utils/config'

export default ({ strapi }: { strapi: Strapi }) => ({
    async getSettings() {
        const pluginStore = strapi.store({
            environment: strapi.config.environment,
            type: 'plugin',
            name: 'api-video-uploader',
        })

        const customSettings = await pluginStore.get({
            key: 'settings',
        })

        console.log(customSettings)

        return customSettings
    },
    async saveSettings(settings: CustomSettings){
        const pluginStore = strapi.store({
            environment: strapi.config.environment,
            type: 'plugin',
            name: 'api-video-uploader',
        })

        try {
            const isValid = await isValidApiKey(settings.apiKey)
            if (isValid) {
                await pluginStore.set({
                    key: 'settings',
                    value: settings,
                })
                console.log(settings)
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    },
})
