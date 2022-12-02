import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Card } from "antd";
import Title from "antd/lib/typography/Title";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Employee = () => {
  const { employeeId } = useParams();

  console.log("windowUrl", employeeId);
  const onFinish = (values) => {
    employee
      ? updateEmployees(values.firstName, values.lastName, values.departmentId)
      : createEmployees(values.firstName, values.lastName, values.departmentId);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [employee, setEmployee] = useState();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUserData = async () => {
    const response = await axios.get(
      `http://localhost:5000/get-employee/${employeeId}`
    );
    setEmployee(response.data);
    setLoading(false);
  };

  const getDepartments = async () => {
    const response = await axiosJWT.get(
      "http://localhost:5000/get-departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDepartments(response.data);
  };

  const createEmployees = async (firstName, lastName, departmentId) => {
    const response = await axios.post(
      "http://localhost:5000/create-employees",
      {
        firstName: firstName,
        lastName: lastName,
        departmentId: departmentId,
      }
    );
    console.log("THIS IS RESPONSE: ", response);
  };

  const updateEmployees = async (firstName, lastName, departmentId) => {
    const response = await axios.put(
      `http://localhost:5000/update-employees/${employeeId}`,
      {
        firstName: firstName,
        lastName: lastName,
        departmentId: departmentId,
      }
    );
    console.log("THIS IS RESPONSE: ", response);
  };

  useEffect(() => {
    refreshToken();
    getDepartments();
    getUserData();
  }, []);

  return (
    <Card style={{ padding: " 12px", borderRadius: " 20px" }}>
      <Title level={2}>Add Employee</Title>
      {console.log("EMPLOYEE DATA", employee)}
      {!loading && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={employee}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true, message: "Please select Department" }]}
          >
            <Select placeholder="Please select State" style={{ width: "20%" }}>
              {departments.map((department) => {
                return (
                  <Select.Option value={department.id}>
                    {department.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {employee ? "Update Employee" : "Create Employee"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default Employee;
