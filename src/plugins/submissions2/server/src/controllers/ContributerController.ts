import { Core } from '@strapi/strapi';

const contributerController = ({ strapi }: { strapi: Core.Strapi }) => {
  // Get all articles
  const index = async (ctx) => {
    ctx.body = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .getContributersArticles();
  };

  // Find all articles with query
  const find = async (ctx) => {
    ctx.body = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .getAllContributersArticles(ctx.query);
  };

  // Submit a new article
  const submit = async (ctx) => {
    const { title, description, author, category, cover, submissionStatus } = ctx.request.body;
    const newArticle = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .createArticle({
        title,
        description,
        author,
        category,
        cover,
        submissionStatus: submissionStatus || 'pending', // Default status
      });
    ctx.body = newArticle;
  };

  // Get a specific submission by ID
  const getSubmission = async (ctx) => {
    console.log('getSubmission', ctx.params);
    const { id } = ctx.params;
    const article = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .getArticleById(id);
    if (!article) {
      return ctx.throw(404, 'Article not found');
    }
    ctx.body = article;
  };

  // Approve a submission
  const approveSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvedBy, approvalComments } = ctx.request.body;
    const updatedArticle = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .updateArticle(id, {
        submissionStatus: 'approved',
        approvedBy,
        approvalComments,
        approvalDate: new Date(),
      });
    ctx.body = updatedArticle;
  };

  // Reject a submission
  const rejectSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    const updatedArticle = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .updateArticle(id, {
        submissionStatus: 'rejected',
        approvalComments,
      });
    ctx.body = updatedArticle;
  };

  // Delete a submission
  const deleteSubmission = async (ctx) => {
    const { id } = ctx.params;
    const deletedArticle = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .deleteArticle(id);
    if (!deletedArticle) {
      return ctx.throw(404, 'Article not found');
    }
    ctx.body = { message: 'Article deleted successfully' };
  };

  // Update a submission
  const updateSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { submissionStatus } = ctx.request.body;
    const updatedArticle = await strapi
      .plugin('submissions2')
      .service('contributerService')
      .updateArticle(id, { submissionStatus });
    ctx.body = updatedArticle;
  };

  const editSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { title, description, author, category, cover, submissionStatus } = ctx.request.body;
    return await strapi
      .plugin('submissions2')
      .service('contributerService')
      .updateArticle(id, { title, description, author, category, cover, submissionStatus });
  };
  return {
    index,
    find,
    submit,
    getSubmission,
    approveSubmission,
    rejectSubmission,
    deleteSubmission,
    updateSubmission,
    editSubmission,
  };
};

export default contributerController;
