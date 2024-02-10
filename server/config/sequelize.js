const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "crispyRead",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  }
);
module.exports = sequelize;
