import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async list(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("myService")
        .getList();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async create(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("myService")
        .createVideoId();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
