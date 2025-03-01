import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { AddArticleIcon } from './components/AddArticleIcon';
import { UserIcon } from './components/UserIcon';

export default {
  register(app: any) {
    let activeLink = ''; // Track the active link

    const setActiveLink = (link: string) => {
      activeLink = link; // Update active link
    };

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Submissions',
      },
      Component: async () => {
        setActiveLink(`plugins/${PLUGIN_ID}`); // Set active link
        const { App } = await import('./pages/App');
        return App;
      },
      isActive: () => {
        return activeLink === `plugins/${PLUGIN_ID}`;
      }, // Highlight if active
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}/add-article`,
      icon: AddArticleIcon,
      intlLabel: {
        id: `${PLUGIN_ID}-add-article`,
        defaultMessage: 'Add Article',
      },
      Component: async () => {
        setActiveLink(`plugins/${PLUGIN_ID}/add-article`); // Set active link
        const AddArticle = await import('./components/AddArticle');
        return AddArticle;
      },
      isActive: () => {
        return activeLink === `plugins/${PLUGIN_ID}/add-article`;
      }, // Highlight if active
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}/update-author-bio/:id`,
      icon: UserIcon,
      intlLabel: {
        id: `${PLUGIN_ID}-update-author-bio`,
        defaultMessage: 'Update Author Bio',
      },
      Component: async () => {
        setActiveLink(`plugins/${PLUGIN_ID}/update-author-bio/:id`);
        const UpdateAuthorBio = await import('./pages/UpdateAuthorBio');
        return UpdateAuthorBio;
      },
      isActive: () => {
        return activeLink.startsWith(`plugins/${PLUGIN_ID}/update-author-bio`);
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
