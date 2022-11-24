import apiVideoContentApiRoutes from './content-api-routes'
import apiVideoAdminRoutes from './admin-routes'
import apiVideoSettingsRoutes from './settings-routes'

const routes = {
    // routes for the admin panel (/api-video-uploader/api-video-asset/...)
    admin: {
        type: 'admin',
        routes: apiVideoAdminRoutes,
    },
    // routes for the plugin settings panel (/api-video-uploader/settings)
    settings: {
        routes: apiVideoSettingsRoutes,
    },
    // routes for the content api (/api/api-video-uploader/...)
    'content-api': {
        type: 'content-api',
        routes: apiVideoContentApiRoutes,
    },
}

export default routes
