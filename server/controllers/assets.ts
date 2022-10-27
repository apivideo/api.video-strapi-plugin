import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async list(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .getList();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async createVideoId(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .createVideoId();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async create(ctx: any) {
    try {
      ctx.body = await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx: any) {
    try {
      ctx.body = await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async delete(ctx: any) {
    try {
      return await strapi
        .plugin("api-video-uploader")
        .service("assets")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
