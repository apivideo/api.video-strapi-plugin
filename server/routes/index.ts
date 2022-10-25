export default [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/settings",
    handler: "settings.getConfig",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/settings",
    handler: "settings.saveConfig",
    config: {
      policies: [],
      auth: false,
    },
  },

  // End Settings
  {
    method: "GET",
    path: "/videos/list",
    handler: "assets.list",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/videos/create",
    handler: "assets.create",
    config: {
      policies: [],
      auth: false,
    },
  },
];
