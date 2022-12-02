import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Employee from "./EmployeeModel";

const { DataTypes } = Sequelize;

const Department = db.define(
  "departments",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

// Department.hasMany(Employee);

export default Department;
