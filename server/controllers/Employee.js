import Department from "../models/DepartmentModel.js";
import Employee from "../models/EmployeeModel.js";

// EMPLoyee

export const createEmployee = async (req, res) => {
  const { firstName, lastName, departmentId } = req.body;
  try {
    await Employee.create({
      firstName: firstName,
      lastName: lastName,
      departmentId: departmentId,
    });
    res.json({ msg: "Employee created Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (req, res) => {
  const { firstName, lastName, departmentId } = req.body;
  const { employeeId } = req.params;
  try {
    const currentEmployee = await Employee.findOne({
      where: { id: employeeId },
    });
    if (!currentEmployee) {
      return res.status(400).json({ msg: "Employee did't find" });
    }
    await currentEmployee.update({
      firstName: firstName,
      lastName: lastName,
      departmentId: departmentId,
    });
    res.json({ msg: "Employee updated Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.body;
    const employees = await Employee.destroy({
      where: { id: id },
    });
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeById = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employees = await Employee.findOne({
      where: { id: employeeId },
    });
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};

export const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    await Department.create({
      name: name,
    });
    res.json({ msg: "Department created Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["id", "name"],
    });
    res.json(departments);
  } catch (error) {
    console.log(error);
  }
};
