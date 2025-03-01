export default [
  {
    method: 'GET',
    path: '/current-user/:userId',
    handler: 'controller.getLoggedInUser',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: 'controller.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/authors',
    handler: 'controller.getAuthors',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/categories',
    handler: 'controller.getCategories',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/editors/articles',
    handler: 'editor.index',
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: 'PATCH',
    path: '/editors/articles/:id/approve',
    handler: 'editor.approveSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: 'PATCH',
    path: '/editors/articles/:id/reject',
    handler: 'editor.rejectSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/contributers/articles',
    handler: 'contributer.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/contributers/allArticles',
    handler: 'contributer.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/contributers/articles/submit',
    handler: 'contributer.submit',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/contributers/articles/:id',
    handler: 'contributer.getSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: 'PUT',
    path: '/contributers/articles/update/:id',
    handler: 'contributer.editSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/contributers/articles/:id',
    handler: 'contributer.deleteSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getArticlesByCategoryId/:id',
    handler: 'contributer.getArticlesByCategoryId',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/contributor-users',
    handler: 'controller.getContributorUsers',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/editor-users',
    handler: 'controller.getEditorUsers',
    config: {
      policies: [],
      auth: false,
    },
  },
];
