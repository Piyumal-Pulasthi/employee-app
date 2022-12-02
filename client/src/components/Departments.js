import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card } from "antd";
import Title from "antd/lib/typography/Title";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Departments = () => {
  const onFinish = (values) => {
    createDepartment(values.name);
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
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      setLoading(false);
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

  const createDepartment = async (name) => {
    const response = await axios.post(
      "http://localhost:5000/create-department",
      {
        name: name,
      }
    );
    console.log("THIS IS RESPONSE: ", response);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <Card style={{ padding: " 12px", borderRadius: " 20px" }}>
      <Title level={2}>Add Employee</Title>
      {!loading && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Department Name"
            name="name"
            rules={[
              { required: true, message: "Please input Department Name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create Department
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default Departments;
