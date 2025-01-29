import pluginPkg from "../../package.json";
import { prefixPluginTranslations } from "@strapi/helper-plugin";
import SubmissionsIcon from "./components/SubmissionIcon"; // Custom icon component if any

const pluginName = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/settings/${pluginName}`,
      icon: SubmissionsIcon,
      intlLabel: {
        id: `${pluginName}.plugin.name`,
        defaultMessage: "Submissions",
      },
      Component: async () => {
        const component = await import("./pages/Home");
        return component;
      },
      permissions: [],
    });
  },

  bootstrap(app: any) {},

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale: string) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => ({
            data: prefixPluginTranslations(data, pluginName),
            locale,
          }))
          .catch(() => ({ data: {}, locale }));
      })
    );
    return Promise.resolve(importedTrads);
  },
};
