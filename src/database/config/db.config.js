const { Sequelize } = require("sequelize");
const { config } = require("../../config");

const { name, user, password, host, port, dialect } = config.db;

const dbConfig = new Sequelize(name, user, password, {
  host,
  port,
  dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = dbConfig;
