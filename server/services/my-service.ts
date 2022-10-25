import { Strapi } from "@strapi/strapi";
import ApiVideoClient from "@api.video/nodejs-client";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  async getList(ctx: any) {
    const defaultApiKey = process.env.API_KEY;

    const client = new ApiVideoClient({
      apiKey: defaultApiKey,
    });

    let result = await client.videos.list();
    return result;
  },

  async createVideoId(ctx: any) {
    const defaultApiKey = process.env.API_KEY;

    const client = new ApiVideoClient({
      apiKey: defaultApiKey,
    });

    const newVideo = await client.videos.create({
      title: "Hello World",
    });
    const token = await client.getAccessToken();
    return { newVideo, token };
  },
});
