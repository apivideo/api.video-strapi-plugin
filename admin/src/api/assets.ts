import { request } from "@strapi/helper-plugin";
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
  delete: async (id: number) => {
    return await request(`/${pluginId}/video/${id}`, {
      method: "DELETE",
    });
  },
};

export default assetRequest;
