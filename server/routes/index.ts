export default [
  // Settings
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
  // Assets
  {
    method: "GET",
    path: "/videos",
    handler: "assets.find",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/video",
    handler: "assets.create",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/video/:id",
    handler: "assets.update",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/video/:id",
    handler: "assets.delete",
    config: {
      policies: [],
      auth: false,
    },
  },
  // {
  //   method: "GET",
  //   path: "/videos/list",
  //   handler: "assets.list",
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
  {
    method: "POST",
    path: "/videos/create",
    handler: "assets.createVideoId",
    config: {
      policies: [],
      auth: false,
    },
  },
];
