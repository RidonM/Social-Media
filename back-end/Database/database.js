const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("socialmedia", "root", "ridon123", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = sequelize;
