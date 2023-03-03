import { findOneWithPrivateVideoTransform, findWithPrivateVideoTransform } from "./controllers/content-api-controller";


const toEntityResponse = (entity: any) => strapi.service("plugin::graphql.format").returnTypes.toEntityResponse(entity);
const toEntityResponseCollection = (entity: any) => strapi.service("plugin::graphql.format").returnTypes.toEntityResponseCollection(entity);


export default async ({ strapi }: { strapi: any }) => {
    const extensionService = strapi.plugin('graphql').service('extension');

    if(!extensionService) {
        return;
    }
    
    extensionService.use({
        resolvers: {
            Query: {
                apiVideoUploaderApiVideoAsset: {
                    resolve: async (parent: any, args: any, context: any, info: any) => toEntityResponse(findOneWithPrivateVideoTransform(args.id))
                },
                apiVideoUploaderApiVideoAssets: {
                    resolve: async (parent: any, args: any, context: any, info: any) => toEntityResponseCollection(await findWithPrivateVideoTransform())
                }
            }
        }
    })
  };
