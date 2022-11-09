import { request } from "@strapi/helper-plugin";
import { InputData } from "../../../types";
import pluginId from "../pluginId";

const assetRequest = {
  getAllvideos: async () => {
    return await request(`/${pluginId}/videos`, {
      method: "GET",
    });
  },
  createVideoId: async (body: Object) => {
    return await request(`/${pluginId}/videos/create`, {
      method: "POST",
      body,
    });
  },
  create: async (body: Object) => {
    return await request(`/${pluginId}/video`, {
      method: "POST",
      body,
    });
  },
  update: async (id: number, videoId: string, body: InputData) => {
    return await request(`/${pluginId}/video/${id}/${videoId}`, {
      method: "PUT",
      body,
    });
  },
  delete: async (id: number, videoId: string) => {
    return await request(`/${pluginId}/video/${id}/${videoId}`, {
      method: "DELETE",
    });
  },
};

export default assetRequest;
