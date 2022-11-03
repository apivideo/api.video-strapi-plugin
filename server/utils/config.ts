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
export { getConfig };
