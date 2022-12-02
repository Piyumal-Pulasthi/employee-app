import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Card } from "antd";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const ListEmployee = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [employees, setEmployees] = useState([]);
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

  const getEmployees = async () => {
    const response = await axiosJWT.get("http://localhost:5000/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("THIS IS RESPONSE: ", response);
    setEmployees(response.data);
    setList(response.data);
  };

  useEffect(() => {
    refreshToken();
    getEmployees();
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <Card style={{ padding: " 12px", borderRadius: " 20px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a href={`http://localhost:3000/update-employees/${item.id}`}>
                Edit
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar />}
                title={
                  <a href="">
                    {item.firstName} {item.lastName}
                  </a>
                }
                description="Good Employee in the team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ListEmployee;
