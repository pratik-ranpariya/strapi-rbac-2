module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: env(
    "PUBLIC_URL",
    "https://ig8cksgkgwkkkoos4g84w88k.cool.dynamicbusiness.com"
  ),
  // url: env("PUBLIC_URL", "https://localhost:1337"),
});
