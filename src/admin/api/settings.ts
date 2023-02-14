import { request } from '@strapi/helper-plugin'
import { CustomSettings } from '../../types'

import pluginId from '../pluginId'

const settingsRequests = {
    get: async (): Promise<CustomSettings> => {
        return await request(`/${pluginId}/settings`, {
            method: 'GET',
        })
    },
    update: async (body: Object) => {
        return await request(`/${pluginId}/settings`, {
            method: 'POST',
            body,
        })
    },
}

export default settingsRequests
