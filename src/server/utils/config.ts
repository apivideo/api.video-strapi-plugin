import ApiVideoClient from '@api.video/nodejs-client'
import * as packageJson from '../../../package.json'

const getConfig = async () => {
    const pluginStore = strapi.store({
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'api-video-uploader',
    })

    const configKey = await pluginStore.get({
        key: 'apiKey',
    })
    return configKey
}

const isValidApiKey = async (apiKey: string) => {
    const client = await configClient(apiKey)

    try {
        const { accessToken } = await client.getAccessToken()
        return accessToken ? true : false
    } catch (error) {
        return false
    }
}

const configClient = async (apiKey?: string) => new ApiVideoClient({
    apiKey: apiKey ? apiKey : await getConfig(),
    sdkName: 'strapi-plugin',
    sdkVersion: packageJson.version,
})

export { getConfig, isValidApiKey, configClient }
