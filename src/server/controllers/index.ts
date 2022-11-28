import { Strapi } from '@strapi/strapi'
import adminController from './admin-controller'
import settingsController from './settings-controller'
import contentApiControler from './content-api-controller'
import pluginId from '../../admin/pluginId'

const model = `plugin::${pluginId}.api-video-asset`

export const isAllowedTo = (strapi: Strapi, ctx: any, action: string) => {
    const pm = (strapi as any).admin.services.permission.createPermissionsManager({
        ability: ctx.state.userAbility,
        action: action,
        model,
    });
    return pm.isAllowed;
}

export default {
    admin: adminController,
    'content-api': contentApiControler,
    settings: settingsController,
}
