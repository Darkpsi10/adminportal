import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  username: "root",
  password: "database",
  host: "localhost",
  database: "sys",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

export const jwtConfig = {
  secretKey: "7261840948500489123393726521119314092565",
};

module.exports = { sequelize, jwtConfig };
