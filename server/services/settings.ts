// const pluginId = require("../../admin/src/pluginId.js");
import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getConfig() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "api-video-uploader",
    });

    const configKey = await pluginStore.get({
      key: "apiKey",
    });
    return JSON.stringify(configKey);
  },
  async saveConfig(ctx: any) {
    const req = ctx.request.body;
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "api-video-uploader",
    });

    try {
      await pluginStore.set({
        key: "apiKey",
        value: req.apiKey,
      });
      return true;
    } catch {
      return false;
    }
  },
});
