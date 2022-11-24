export default [
    {
        method: 'GET',
        path: '/api-video-asset',
        handler: 'content-api.find',
        config: {
            description: 'Find all Api.video assets',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/api-video-asset/count',
        handler: 'content-api.count',
        config: {
            description: 'Counts the number of Api.video items',
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/api-video-asset/:id',
        handler: 'content-api.findOne',
        config: {
            description: 'Find one Api.video asset by id',
            policies: [],
        },
    },
]
