import pluginPkg from '../../package.json';

const pluginId = pluginPkg.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

export default pluginId;
