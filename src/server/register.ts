import { replacePrivateVideoTokens } from './utils/private-videos'

export default async ({ strapi }: { strapi: any }) => {
    const extensionService = strapi?.plugin('graphql')?.service('extension')

    if (!extensionService) {
        return
    }

    extensionService.use({
        resolvers: {
            ApiVideoUploaderApiVideoAssetEntity: {
                attributes: {
                    resolve: async (parent: any, args: any, context: any, info: any) =>
                        replacePrivateVideoTokens(parent),
                },
            },
        },
    })
}
