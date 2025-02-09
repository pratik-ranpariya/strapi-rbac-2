"use strict";

module.exports = {
  async index(ctx) {
    try {
      const submissions = await strapi
        .plugin("submissions")
        .service("myService")
        .getSubmissions();

      ctx.body = { data: submissions };
    } catch (error) {
      console.error("Error in the controller", error);
      ctx.throw(500, "Unable to fetch submissions");
    }
  },
};
