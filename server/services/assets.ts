import { Strapi } from "@strapi/strapi";
import ApiVideoClient from "@api.video/nodejs-client";
import pluginId from "../../admin/src/pluginId";

const model = `plugin::${pluginId}.asset`;

export default ({ strapi }: { strapi: Strapi }) => ({
  // async getList() {
  //   const defaultApiKey = process.env.API_KEY;

  //   const client = new ApiVideoClient({
  //     apiKey: defaultApiKey,
  //   });

  //   let result = await client.videos.list();
  //   return result;
  // },

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

  async find(query: any) {
    return await strapi.entityService.findMany(model, query);
  },

  async delete(id: string) {
    return await strapi.entityService.delete(model, id);
  },

  async create(data: any) {
    // return await strapi.entityService.create(model, data);
    return await strapi.entityService.create(model, { data: data });
    // console.log(data);
    // return await strapi.entityService.create(model, {
    //   data: {
    //     title: "My Article",
    //     videoId: "videoId",
    //   },
    // });
  },

  async update(id: string, data: any) {
    return await strapi.entityService.update(model, id, data);
  },
});
