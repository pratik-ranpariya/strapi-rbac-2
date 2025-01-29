export default ({ strapi }: { strapi: any }) => ({
  routes: [
    {
      method: "GET",
      path: "/hello",
      handler: async (ctx: any) => {
        ctx.send({ message: "Hello from the custom plugin!" });
      },
    },
  ],
});
