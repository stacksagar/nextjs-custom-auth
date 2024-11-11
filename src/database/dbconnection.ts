import { Sequelize } from "sequelize";

const dbconnection = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
    port: 3306,
    dialectModule: require("mysql2"),
  }
);

export default dbconnection;
