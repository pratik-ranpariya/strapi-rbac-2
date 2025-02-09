module.exports = {
  "pass-data": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/getArticles",
        handler: "myController.index",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
};
