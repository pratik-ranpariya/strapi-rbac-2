"use strict";

module.exports = {
  async getSubmissions() {
    return await strapi.entityService.findMany("api::article.article", {
      populate: ["author"],
    });
  },
};
