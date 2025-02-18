export default [
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
    method: 'PATCH',
    path: '/contributers/articles/update/:id',
    handler: 'contributer.updateSubmission',
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
];
