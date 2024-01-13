const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialectOptions: {
      connectTimeout: 1000000,
    },
    host: process.env.DB_HOST || "localhost",

    dialect: "mysql",
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    },
  }
);

module.exports = {
  sequelize,
};
