import pluginId from "../pluginId";

const settingsRead = [
  { action: `plugin::${pluginId}.settings.read`, subject: null },
];
const settingsUpdate = [
  { action: `plugin::${pluginId}.settings.change`, subject: null },
];
const mainRead = [{ action: `plugin::${pluginId}.read`, subject: null }];
const mainCreate = [{ action: `plugin::${pluginId}.create`, subject: null }];
const mainUpdate = [{ action: `plugin::${pluginId}.update`, subject: null }];
const mainDelete = [{ action: `plugin::${pluginId}.delete`, subject: null }];

const pluginPermissions = {
  settingsRoles: new Array().concat(settingsRead, settingsUpdate),
  settingsRead,
  settingsUpdate,
  mainRead,
  mainCreate,
  mainUpdate,
  mainDelete,
};

export default pluginPermissions;
