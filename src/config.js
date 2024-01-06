const config = {
  isProd: process.env.NODE_ENV === "production",
  port: process.env.APP_PORT || 4000,
};

module.exports = { config };
