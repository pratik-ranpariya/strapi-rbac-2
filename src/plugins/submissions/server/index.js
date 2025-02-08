"use strict";

module.exports = ({ strapi }) => ({
  register() {
    // Register your plugin's functionality
  },
  bootstrap() {
    // Bootstrap your plugin
  },
  destroy() {
    // Cleanup when plugin is destroyed
  },
  config: {
    // Plugin configuration
  },
  controllers: {
    myController: require("./controllers/my-controller")({ strapi }),
  },
  routes: require("./routes"),
  services: {
    myService: require("./services/my-service")({ strapi }),
  },
});
