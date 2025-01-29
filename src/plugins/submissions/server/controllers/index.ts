export default {
  getWelcomeMessage: async (ctx: any) => {
    ctx.body = { message: "Welcome to submissions plugin!" };
  },
};
