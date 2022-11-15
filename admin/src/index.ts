import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import pluginPermissions from "./utils/permissions";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },

      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      // permissions: pluginPermissions.mainRead,

      // permissions: [
      //   // Uncomment to set the permissions of the plugin here
      //   // {
      //   //   action: '', // the action name should be plugin::plugin-name.actionType
      //   //   subject: null,
      //   // },
      // ],
    });

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          // id: getTrad("SettingsNav.section-label"),
          id: "Api Video Uploader plugin Settings Section",
          defaultMessage: "Api Video Uploader",
        },
      },
      [
        {
          intlLabel: {
            id: "Settings Section Api Video",
            defaultMessage: "Settings",
          },
          id: "api-video-uploader-settings",
          to: `/settings/${pluginId}`,
          // permissions: pluginPermissions.settingsRoles,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "mux-video-uploader-settings-page" */ "./pages/Settings"
            );

            return component;
          },
        },
      ]
    );

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app: any) {},
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale: string) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
