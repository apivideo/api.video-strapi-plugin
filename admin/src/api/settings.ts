import { request } from "@strapi/helper-plugin";

const settingsRequests = {
  get: async () => {
    return await request("/api-video-uploader/settings", {
      method: "GET",
    });
  },
  update: async (body: Object) => {
    return await request("/api-video-uploader/settings", {
      method: "POST",
      body,
    });
  },
};

export default settingsRequests;
