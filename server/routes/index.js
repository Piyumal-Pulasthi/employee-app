import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  createDepartment,
  getDepartments,
} from "../controllers/Employee.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.get("/employees", verifyToken, getEmployees);
router.post("/create-employees", createEmployee);
router.get("/get-employee/:employeeId", getEmployeeById);
router.put("/update-employees/:employeeId", updateEmployee);
router.post("/create-department", createDepartment);
router.get("/get-departments", verifyToken, getDepartments);

export default router;
