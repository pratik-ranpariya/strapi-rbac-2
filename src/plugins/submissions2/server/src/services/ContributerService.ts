import { Core } from '@strapi/strapi';

const contributerService = ({ strapi }: { strapi: Core.Strapi }) => {
  // Get all articles for contributers
  const getContributersArticles = async () => {
    return await strapi.entityService.findMany('plugin::submissions2.article', {
      populate: ['author', 'category', 'cover'],
    });
  };

  // Find all articles with query
  const getAllContributersArticles = async (query) => {
    return await strapi.entityService.findMany('plugin::submissions2.article', {
      ...query,
      populate: ['author', 'category', 'cover'],
    });
  };

  // Create a new article submission
  const createArticle = async (data) => {
    return await strapi.entityService.create('plugin::submissions2.article', {
      data,
    });
  };

  // Get a specific article by ID
  const getArticleById = async (id) => {
    return await strapi.entityService.findOne('plugin::submissions2.article', id, {
      populate: ['author', 'category', 'cover'],
    });
  };

  // Update an article (approve/reject)
  const updateArticle = async (id, data) => {
    return await strapi.entityService.update('plugin::submissions2.article', id, {
      data,
    });
  };

  // Delete an article
  const deleteArticle = async (id) => {
    return await strapi.entityService.delete('plugin::submissions2.article', id);
  };

  return {
    getContributersArticles,
    getAllContributersArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
  };
};

export default contributerService;
