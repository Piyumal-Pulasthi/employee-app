import { Sequelize } from "sequelize";

const db = new Sequelize("employee_app", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
