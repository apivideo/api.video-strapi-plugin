import { request } from "@strapi/helper-plugin";

const settingsRequests = {
  getConfig: async () => {
    return await request("/api-video-uploader/settings", {
      method: "GET",
    });
  },
  editConfig: async (body: Object) => {
    return await request("/api-video-uploader/settings", {
      method: "POST",
      body,
    });
  },
};

export default settingsRequests;
