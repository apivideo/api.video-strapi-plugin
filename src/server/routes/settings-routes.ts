export default [
    {
        method: 'GET',
        path: '/settings',
        handler: 'settings.getConfig',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/settings',
        handler: 'settings.saveConfig',
        config: {
            policies: [],
        },
    },
]
