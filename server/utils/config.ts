import ApiVideoClient from "@api.video/nodejs-client";
import * as packageJson from "../../package.json";

const getConfig = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "plugin",
    name: "api-video-uploader",
  });

  const configKey = await pluginStore.get({
    key: "apiKey",
  });
  return configKey;
};

const isValidApiKey = async (apiKey: string) => {
  const client = new ApiVideoClient({ apiKey });

  try {
    const { accessToken } = await client.getAccessToken();
    return accessToken ? true : false;
  } catch (error) {
    return false;
  }
};

const configClient = async () => {
  const defaultApiKey = await getConfig();
  const client = new ApiVideoClient({
    apiKey: defaultApiKey,
    sdkName: "strapi-plugin",
    sdkVersion: packageJson.version,
  });
  return client;
};

export { getConfig, isValidApiKey, configClient };
