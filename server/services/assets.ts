import { Strapi } from "@strapi/strapi";
import ApiVideoClient from "@api.video/nodejs-client";
import pluginId from "../../admin/src/pluginId";
import { getConfig } from "../utils/config";

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

  async createVideoId(data: any) {
    const defaultApiKey = await getConfig();
    const client = new ApiVideoClient({
      apiKey: defaultApiKey,
    });
    const newVideo = await client.videos.create({
      title: data["title"],
    });
    const token = await client.getAccessToken();
    return { newVideo, token };
  },

  async find(query: any) {
    return await strapi.entityService.findMany(model, query);
  },

  async delete(id: string): Promise<boolean> {
    await strapi.entityService.delete(model, id);
    return true;
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
