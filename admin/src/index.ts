import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginPkg from '../../package.json'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'
import pluginPermissions from './permissions'
import pluginId from './pluginId'

const name = pluginPkg.strapi.name
const displayName = pluginPkg.strapi.displayName

export default {
    register(app: any) {
        app.addMenuLink({
            to: `/plugins/${pluginId}`,
            icon: PluginIcon,
            intlLabel: {
                id: `${pluginId}.plugin.name`,
                defaultMessage: displayName,
            },
            permissions: pluginPermissions.mainRead,
            Component: async () => await import('./pages/App'),
        })

        app.createSettingSection(
            {
                id: pluginId,
                intlLabel: {
                    id: 'Api.Video Uploader plugin Settings Section',
                    defaultMessage: 'Api.video Uploader',
                },
            },
            [
                {
                    intlLabel: {
                        id: 'Settings Section Api.Video',
                        defaultMessage: 'Settings',
                    },
                    id: 'api-video-uploader-settings',
                    to: `/settings/${pluginId}`,
                    permissions: pluginPermissions.settingsRoles,
                    Component: async () => await import('./pages/Settings'),
                },
            ]
        )

        app.registerPlugin({
            id: pluginId,
            initializer: Initializer,
            isReady: false,
            name,
        })
    },

    bootstrap(app: any) {},
    async registerTrads(app: any) {
        const { locales } = app

        const importedTrads = await Promise.all(
            locales.map((locale: any) => {
                return import(`./translations/${locale}`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, pluginId),
                            locale,
                        }
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        }
                    })
            })
        )

        return Promise.resolve(importedTrads)
    },
}
