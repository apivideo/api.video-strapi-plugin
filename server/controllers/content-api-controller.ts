import { factories  } from "@strapi/strapi";

export default  factories.createCoreController('plugin::api-video-uploader.api-video-asset', ({ strapi }) => ({
    async count(ctx) {
        return super.count(ctx);
    },
}));