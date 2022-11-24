import pluginId from './../admin/pluginId'

export default async ({ strapi }: { strapi: any }) => {
    const actions = [
        // App
        {
            section: 'plugins',
            displayName: 'Read',
            uid: 'read',
            pluginName: pluginId,
        },
        {
            section: 'plugins',
            displayName: 'Create',
            uid: 'create',
            pluginName: pluginId,
        },
        {
            section: 'plugins',
            displayName: 'Update',
            uid: 'update',
            pluginName: pluginId,
        },
        {
            section: 'plugins',
            displayName: 'Delete',
            uid: 'delete',
            pluginName: pluginId,
        },
        // Settings
        {
            section: 'plugins',
            displayName: 'Read',
            subCategory: 'settings',
            uid: 'settings',
            pluginName: pluginId,
        },
        {
            section: 'plugins',
            displayName: 'Update',
            subCategory: 'settings',
            uid: 'settings.update',
            pluginName: pluginId,
        },
    ]

    await strapi.admin.services.permission.actionProvider.registerMany(actions)
}
