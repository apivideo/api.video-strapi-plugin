export default [
  // Settings
  {
    method: "GET",
    path: "/settings",
    handler: "settings.getConfig",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/settings",
    handler: "settings.saveConfig",
    config: {
      policies: [],
    },
  },
  // Assets
  {
    method: "GET",
    path: "/videos",
    handler: "assets.find",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/video",
    handler: "assets.create",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/video/:id/:videoId",
    handler: "assets.update",
    config: {
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/video/:id/:videoId",
    handler: "assets.delete",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/videos/create",
    handler: "assets.createVideoId",
    config: {
      policies: [],
    },
  },
];
