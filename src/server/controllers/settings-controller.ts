import { Strapi } from '@strapi/strapi'
import { isAllowedTo } from '.';
import { mainCreateAction, mainDeleteAction, mainReadAction, mainUpdateAction, settingsReadAction, settingsUpdateAction } from '../../admin/actions';

export default ({ strapi }: { strapi: Strapi }) => ({
    async getConfig(ctx: any) {
        try {
            if (!isAllowedTo(strapi, ctx, settingsReadAction)
                && !isAllowedTo(strapi, ctx, mainReadAction)
                && !!isAllowedTo(strapi, ctx, mainCreateAction)
                && !!isAllowedTo(strapi, ctx, mainUpdateAction)
                && !!isAllowedTo(strapi, ctx, mainDeleteAction)) {
                    
                return ctx.forbidden();
            }

            return await strapi.plugin('api-video-uploader').service('settings').getConfig(ctx)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
    async saveConfig(ctx: any) {
        try {
            if (!isAllowedTo(strapi, ctx, settingsUpdateAction)) {
                return ctx.forbidden();
            }

            return await strapi.plugin('api-video-uploader').service('settings').saveConfig(ctx)
        } catch (err) {
            ctx.throw(500, err)
        }
    },
})
