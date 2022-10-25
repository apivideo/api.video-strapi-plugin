import { request } from "@strapi/helper-plugin";

const assetRequest = {
  getAllvideos: async () => {
    return await request("/api-video-uploader/videos/list", {
      method: "GET",
    });
  },
  createVideoId: async () => {
    return await request("/api-video-uploader/videos/create", {
      method: "POST",
    });
  },
};

export default assetRequest;
