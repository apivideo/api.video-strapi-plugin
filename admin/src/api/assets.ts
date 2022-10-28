import { request } from "@strapi/helper-plugin";

const assetRequest = {
  getAllvideos: async () => {
    return await request("/api-video-uploader/videos", {
      method: "GET",
    });
  },
  createVideoId: async () => {
    return await request("/api-video-uploader/videos/create", {
      method: "POST",
    });
  },
  create: async (body: Object) => {
    return await request("/api-video-uploader/video", {
      method: "POST",
      body,
    });
  },
};

export default assetRequest;
