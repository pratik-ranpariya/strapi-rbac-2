import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin('submissions2').service('service').getWelcomeMessage();
  },

  async getCategories(ctx: any) {
    return await strapi.plugin('submissions2').service('service').getAllCategories(ctx);
  },

  async getAuthors(ctx: any) {
    return await strapi.plugin('submissions2').service('service').getAllAuthors(ctx);
  },

  async getContributorUsers(ctx: any) {
    console.log('ctx Contributor Users', ctx);
    return await strapi.plugin('submissions2').service('service').getAllContributorUsers(ctx);
  },

  async getEditorUsers(ctx: any) {
    console.log('ctx Editor Users', ctx);
    return await strapi.plugin('submissions2').service('service').getAllEditorUsers(ctx);
  },

  async getLoggedInUser(ctx: any) {
    const { userId } = ctx.params;
    return await strapi.plugin('submissions2').service('service').getLoggedInUser(userId);
  },
});

export default controller;
