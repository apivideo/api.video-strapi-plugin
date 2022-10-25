import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx: { body: any }) {
    ctx.body = strapi
      .plugin("api-video-uploader")
      .service("myService")
      .getWelcomeMessage();
  },
});
