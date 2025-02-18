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
});

export default service;
