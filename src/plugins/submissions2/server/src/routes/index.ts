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
    path: '/editors/articles',
    handler: 'editor.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/editors/allArticles',
    handler: 'editor.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/editors/articles/submit',
    handler: 'editor.submit',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/editors/articles/:id',
    handler: 'editor.getSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/editors/articles/:id/approve',
    handler: 'editor.approveSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/editors/articles/:id/reject',
    handler: 'editor.rejectSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/editors/articles/:id',
    handler: 'editor.deleteSubmission',
    config: {
      policies: [],
      auth: false,
    },
  },
];
