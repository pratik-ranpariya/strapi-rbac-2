"use strict";

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = { message: "Welcome to Submissions" };
  },
});
