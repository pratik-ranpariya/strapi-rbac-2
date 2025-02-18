import { Core } from '@strapi/strapi';

const editorController = ({ strapi }: { strapi: Core.Strapi }) => {
  // Get all articles
  const index = async (ctx) => {
    ctx.body = await strapi.plugin('submissions2').service('editorService').getEditorsArticles();
  };

  // Find all articles with query
  const find = async (ctx) => {
    ctx.body = await strapi
      .plugin('submissions2')
      .service('editorService')
      .getAllEditorsArticles(ctx.query);
  };

  // Submit a new article
  const submit = async (ctx) => {
    const { title, description, author, category, cover, submissionStatus } = ctx.request.body;
    const newArticle = await strapi
      .plugin('submissions2')
      .service('editorService')
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
    const { id } = ctx.params;
    const article = await strapi.plugin('submissions2').service('editorService').getArticleById(id);
    if (!article) {
      return ctx.throw(404, 'Article not found');
    }
    ctx.body = article;
  };

  // Approve a submission
  const approveSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    const updatedArticle = await strapi
      .plugin('submissions2')
      .service('editorService')
      .updateArticle(id, {
        submissionStatus: 'approved',
        approvalComments,
        approvalDate: new Date(),
      });
    ctx.body = updatedArticle;
  };

  // Reject a submission
  const rejectSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    console.log('Rejecting article:', id);
    const updatedArticle = await strapi
      .plugin('submissions2')
      .service('editorService')
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
      .service('editorService')
      .deleteArticle(id);
    if (!deletedArticle) {
      return ctx.throw(404, 'Article not found');
    }
    ctx.body = { message: 'Article deleted successfully' };
  };

  return {
    index,
    find,
    submit,
    getSubmission,
    approveSubmission,
    rejectSubmission,
    deleteSubmission,
  };
};

export default editorController;
