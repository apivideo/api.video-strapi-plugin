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
      description: data["description"],
      tags: data["tags"],
      metadata: data["metadata"],
    });
    const token = await client.getAccessToken();
    return { newVideo, token };
  },

  async find(query: any) {
    return await strapi.entityService.findMany(model, query);
  },

  async delete(id: string, videoId: string): Promise<boolean> {
    const defaultApiKey = await getConfig();
    const client = new ApiVideoClient({
      apiKey: defaultApiKey,
    });
    try {
      await client.videos.delete(videoId);
      await strapi.entityService.delete(model, id);
      return true;
    } catch (error) {
      return false;
    }
  },

  async create(data: any) {
    try {
      await strapi.entityService.create(model, { data: data });
      return true;
    } catch (error) {
      return false;
    }
  },

  async update(id: string, videoId: string, data: any) {
    const defaultApiKey = await getConfig();
    const client = new ApiVideoClient({
      apiKey: defaultApiKey,
    });
    try {
      await client.videos.update(videoId, data);
      await strapi.entityService.update(model, id, { data: data });
      return true;
    } catch (error) {
      return false;
    }
  },
});
