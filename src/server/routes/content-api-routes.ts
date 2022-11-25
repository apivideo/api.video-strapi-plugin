export default [
    {
        method: 'GET',
        path: '/api-video-asset',
        handler: 'content-api.find',
        config: {
            description: 'Find all api.video assets',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/api-video-asset/count',
        handler: 'content-api.count',
        config: {
            description: 'Counts the number of api.video items',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/api-video-asset/:id',
        handler: 'content-api.findOne',
        config: {
            description: 'Find one api.video asset by id',
            policies: [],
        },
    },
]
