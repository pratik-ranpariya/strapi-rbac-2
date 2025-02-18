import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin('submissions2').service('service').getWelcomeMessage();
  },

  async getCategories(ctx) {
    return await strapi.plugin('submissions2').service('service').getAllCategories();
  },

  async getAuthors(ctx) {
    return await strapi.plugin('submissions2').service('service').getAllAuthors();
  },
});

export default controller;
