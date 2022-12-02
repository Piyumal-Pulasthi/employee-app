import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Department from "./DepartmentModel";

const { DataTypes } = Sequelize;

const Employee = db.define(
  "employees",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

// Employee.hasOne(Department);

export default Employee;
