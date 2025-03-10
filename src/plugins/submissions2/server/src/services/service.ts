import type { Core } from '@strapi/strapi';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Submissions2 🚀';
  },
  async getAllUsers() {
    return await strapi.entityService.findMany('api::author.author');
  },
  async getAllCategories() {
    return await strapi.entityService.findMany('api::category.category');
  },
  async getAllArticles() {
    return await strapi.entityService.findMany('api::article.article');
  },
  async getAllAuthors() {
    return await strapi.entityService.findMany('api::author.author');
  },
  async getLoggedInUser(userId: string) {
    try {
      const users = await strapi.entityService.findOne('admin::user', userId, {
        populate: '*',
      });
      console.log('users', users);
      return users;
    } catch (error) {
      return console.log('Error fetching users', error);
    }
  },

  async getAllContributorUsers(ctx: any) {
    return await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        role: 'contributor',
      },
    });
  },

  async getAllEditorUsers(ctx: any) {
    return await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        role: 'editor',
      },
    });
  },
});

export default service;
