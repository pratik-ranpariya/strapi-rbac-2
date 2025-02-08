import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
// import { Envelopes, User, Write } from "@strapi/icons";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Submissions",
      },
      Component: async () => {
        const component = await import("./pages/HomePage");
        return component;
      },
      permissions: [],
      subNav: [
        {
          to: `/plugins/${pluginId}/contributors`,
          icon: "User",
          intlLabel: {
            id: `${pluginId}.plugin.name.contributors`,
            defaultMessage: "Contributors",
          },
          permissions: [],
        },
        {
          to: `/plugins/${pluginId}/editors`,
          icon: "Write",
          intlLabel: {
            id: `${pluginId}.plugin.name.editors`,
            defaultMessage: "Editors",
          },
          permissions: [],
        },
      ],
    });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
};
