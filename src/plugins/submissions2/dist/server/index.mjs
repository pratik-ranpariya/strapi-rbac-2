const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
};
const config = {
  default: {},
  validator() {
  }
};
const kind = "collectionType";
const collectionName = "articles";
const info = {
  singularName: "article",
  pluralName: "articles",
  displayName: "Article",
  description: "Create your blog content"
};
const options = {
  draftAndPublish: false
};
const pluginOptions = {
  "content-manager": {
    visible: false
  },
  "content-type-builder": {
    visible: false
  }
};
const attributes = {
  title: {
    type: "string"
  },
  description: {
    type: "text",
    maxLength: 80
  },
  slug: {
    type: "uid",
    targetField: "title"
  },
  cover: {
    type: "media",
    multiple: false,
    required: false,
    allowedTypes: [
      "images",
      "files",
      "videos"
    ]
  },
  author: {
    type: "relation",
    relation: "manyToOne",
    target: "api::author.author",
    inversedBy: "articles"
  },
  category: {
    type: "relation",
    relation: "manyToOne",
    target: "api::category.category",
    inversedBy: "articles"
  },
  blocks: {
    type: "dynamiczone",
    components: [
      "shared.media",
      "shared.quote",
      "shared.rich-text",
      "shared.slider"
    ]
  },
  submissionStatus: {
    type: "enumeration",
    "enum": [
      "draft",
      "submitted",
      "pending_approval",
      "approved",
      "rejected"
    ],
    "default": "draft",
    description: "The current status of the submission"
  },
  approvalComments: {
    type: "text",
    required: false,
    description: "Comments from the approver regarding the submission"
  },
  approvedBy: {
    type: "relation",
    relation: "manyToOne",
    target: "api::author.author",
    description: "The user who approved the submission"
  },
  approvalDate: {
    type: "date",
    required: false,
    description: "The date when the submission was approved"
  }
};
const schema = {
  kind,
  collectionName,
  info,
  options,
  pluginOptions,
  attributes
};
const article = {
  schema,
  kind: "collectionType",
  __schema__: schema,
  // This is important for Strapi's internal use
  uid: "plugin::submissions2.article",
  // Ensure this is correct
  modelType: "contentType",
  modelName: "article",
  // Change this to match singularName
  connection: "default"
};
const contentTypes = {
  article
};
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("submissions2").service("service").getWelcomeMessage();
  },
  async getCategories(ctx) {
    return await strapi.plugin("submissions2").service("service").getAllCategories();
  },
  async getAuthors(ctx) {
    return await strapi.plugin("submissions2").service("service").getAllAuthors();
  }
});
const editorController = ({ strapi }) => {
  const index2 = async (ctx) => {
    ctx.body = await strapi.plugin("submissions2").service("editorService").getEditorsArticles();
  };
  const find = async (ctx) => {
    ctx.body = await strapi.plugin("submissions2").service("editorService").getAllEditorsArticles(ctx.query);
  };
  const submit = async (ctx) => {
    const { title, description, author, category, cover, submissionStatus } = ctx.request.body;
    const newArticle = await strapi.plugin("submissions2").service("editorService").createArticle({
      title,
      description,
      author,
      category,
      cover,
      submissionStatus: submissionStatus || "pending"
      // Default status
    });
    ctx.body = newArticle;
  };
  const getSubmission = async (ctx) => {
    const { id } = ctx.params;
    const article2 = await strapi.plugin("submissions2").service("editorService").getArticleById(id);
    if (!article2) {
      return ctx.throw(404, "Article not found");
    }
    ctx.body = article2;
  };
  const approveSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    const updatedArticle = await strapi.plugin("submissions2").service("editorService").updateArticle(id, {
      submissionStatus: "approved",
      approvalComments,
      approvalDate: /* @__PURE__ */ new Date()
    });
    ctx.body = updatedArticle;
  };
  const rejectSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    console.log("Rejecting article:", id);
    const updatedArticle = await strapi.plugin("submissions2").service("editorService").updateArticle(id, {
      submissionStatus: "rejected",
      approvalComments
    });
    ctx.body = updatedArticle;
  };
  const deleteSubmission = async (ctx) => {
    const { id } = ctx.params;
    const deletedArticle = await strapi.plugin("submissions2").service("editorService").deleteArticle(id);
    if (!deletedArticle) {
      return ctx.throw(404, "Article not found");
    }
    ctx.body = { message: "Article deleted successfully" };
  };
  return {
    index: index2,
    find,
    submit,
    getSubmission,
    approveSubmission,
    rejectSubmission,
    deleteSubmission
  };
};
const contributerController = ({ strapi }) => {
  const index2 = async (ctx) => {
    ctx.body = await strapi.plugin("submissions2").service("contributerService").getContributersArticles();
  };
  const find = async (ctx) => {
    ctx.body = await strapi.plugin("submissions2").service("contributerService").getAllContributersArticles(ctx.query);
  };
  const submit = async (ctx) => {
    const { title, description, author, category, cover, submissionStatus } = ctx.request.body;
    const newArticle = await strapi.plugin("submissions2").service("contributerService").createArticle({
      title,
      description,
      author,
      category,
      cover,
      submissionStatus: submissionStatus || "pending"
      // Default status
    });
    ctx.body = newArticle;
  };
  const getSubmission = async (ctx) => {
    const { id } = ctx.params;
    const article2 = await strapi.plugin("submissions2").service("contributerService").getArticleById(id);
    if (!article2) {
      return ctx.throw(404, "Article not found");
    }
    ctx.body = article2;
  };
  const approveSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvedBy, approvalComments } = ctx.request.body;
    const updatedArticle = await strapi.plugin("submissions2").service("contributerService").updateArticle(id, {
      submissionStatus: "approved",
      approvedBy,
      approvalComments,
      approvalDate: /* @__PURE__ */ new Date()
    });
    ctx.body = updatedArticle;
  };
  const rejectSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { approvalComments } = ctx.request.body;
    const updatedArticle = await strapi.plugin("submissions2").service("contributerService").updateArticle(id, {
      submissionStatus: "rejected",
      approvalComments
    });
    ctx.body = updatedArticle;
  };
  const deleteSubmission = async (ctx) => {
    const { id } = ctx.params;
    const deletedArticle = await strapi.plugin("submissions2").service("contributerService").deleteArticle(id);
    if (!deletedArticle) {
      return ctx.throw(404, "Article not found");
    }
    ctx.body = { message: "Article deleted successfully" };
  };
  const updateSubmission = async (ctx) => {
    const { id } = ctx.params;
    const { submissionStatus } = ctx.request.body;
    const updatedArticle = await strapi.plugin("submissions2").service("contributerService").updateArticle(id, { submissionStatus });
    ctx.body = updatedArticle;
  };
  return {
    index: index2,
    find,
    submit,
    getSubmission,
    approveSubmission,
    rejectSubmission,
    deleteSubmission,
    updateSubmission
  };
};
const controllers = {
  controller,
  editor: editorController,
  contributer: contributerController
};
const middlewares = {};
const policies = {};
const routes = [
  {
    method: "GET",
    path: "/",
    handler: "controller.index",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/authors",
    handler: "controller.getAuthors",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/categories",
    handler: "controller.getCategories",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/editors/articles",
    handler: "editor.index",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "PATCH",
    path: "/editors/articles/:id/approve",
    handler: "editor.approveSubmission",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "PATCH",
    path: "/editors/articles/:id/reject",
    handler: "editor.rejectSubmission",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/contributers/articles",
    handler: "contributer.index",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/contributers/allArticles",
    handler: "contributer.find",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "POST",
    path: "/contributers/articles/submit",
    handler: "contributer.submit",
    config: {
      policies: [],
      auth: false
    }
  },
  // {
  //   method: 'GET',
  //   path: '/contributers/articles/:id',
  //   handler: 'contributer.getSubmission',
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
  {
    method: "PATCH",
    path: "/contributers/articles/update/:id",
    handler: "contributer.updateSubmission",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "DELETE",
    path: "/contributers/articles/:id",
    handler: "contributer.deleteSubmission",
    config: {
      policies: [],
      auth: false
    }
  }
];
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Submissions2 🚀";
  },
  async getAllUsers() {
    return await strapi.entityService.findMany("api::author.author");
  },
  async getAllCategories() {
    return await strapi.entityService.findMany("api::category.category");
  },
  async getAllArticles() {
    return await strapi.entityService.findMany("api::article.article");
  },
  async getAllAuthors() {
    return await strapi.entityService.findMany("api::author.author");
  }
});
const editorService = ({ strapi }) => {
  const getEditorsArticles = async () => {
    return await strapi.entityService.findMany("plugin::submissions2.article", {
      populate: ["author", "category", "cover"]
    });
  };
  const getAllEditorsArticles = async (query) => {
    return await strapi.entityService.findMany("plugin::submissions2.article", {
      ...query,
      populate: ["author", "category", "cover"]
    });
  };
  const createArticle = async (data) => {
    return await strapi.entityService.create("plugin::submissions2.article", {
      data
    });
  };
  const getArticleById = async (id) => {
    return await strapi.entityService.findOne("plugin::submissions2.article", id, {
      populate: ["author", "category", "cover"]
    });
  };
  const updateArticle = async (id, data) => {
    return await strapi.entityService.update("plugin::submissions2.article", id, {
      data
    });
  };
  const deleteArticle = async (id) => {
    return await strapi.entityService.delete("plugin::submissions2.article", id);
  };
  return {
    getEditorsArticles,
    getAllEditorsArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle
  };
};
const contributerService = ({ strapi }) => {
  const getContributersArticles = async () => {
    return await strapi.entityService.findMany("plugin::submissions2.article", {
      populate: ["author", "category", "cover"]
    });
  };
  const getAllContributersArticles = async (query) => {
    return await strapi.entityService.findMany("plugin::submissions2.article", {
      ...query,
      populate: ["author", "category", "cover"]
    });
  };
  const createArticle = async (data) => {
    return await strapi.entityService.create("plugin::submissions2.article", {
      data
    });
  };
  const getArticleById = async (id) => {
    return await strapi.entityService.findOne("plugin::submissions2.article", id, {
      populate: ["author", "category", "cover"]
    });
  };
  const updateArticle = async (id, data) => {
    return await strapi.entityService.update("plugin::submissions2.article", id, {
      data
    });
  };
  const deleteArticle = async (id) => {
    return await strapi.entityService.delete("plugin::submissions2.article", id);
  };
  return {
    getContributersArticles,
    getAllContributersArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle
  };
};
const services = {
  service,
  editorService,
  contributerService
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
