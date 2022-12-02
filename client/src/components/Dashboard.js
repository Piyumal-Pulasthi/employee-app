/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [menus, setMenus] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const [menusDetails, setMenuDetails] = useState([]);
  const [dishes, setDishes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getUsers();
    getMenu();
    getRestaurant();
    getMenuDetails();
    getDishes();
  }, []);

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

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const getMenu = async () => {
    const response = await axiosJWT.get("http://localhost:5000/menu", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMenus(response.data);
  };

  const getRestaurant = async () => {
    const response = await axiosJWT.get("http://localhost:5000/restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRestaurant(response.data);
  };

  const getMenuDetails = async () => {
    const response = await axiosJWT.get("http://localhost:5000/menu-only", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMenuDetails(response.data);
  };

  const getDishes = async () => {
    const response = await axiosJWT.get("http://localhost:5000/dishes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDishes(response.data);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
      <div>
        <div className="row">
          <div className="column">
            <img src="https://picsum.photos/200" />
          </div>
          <div className="column">
            <b>Brilliant restaurant {restaurant?.name}</b>
            <h2>Shop is located at {restaurant?.location}</h2>
            <h3>Delivery charges will be {restaurant?.delivery_charge}$</h3>
          </div>
        </div>

        <div>
          <div>
            {menusDetails.map((menuDetail) => (
              <h1>
                <hr class="dashed"></hr>

                <div className="row-data">
                  <div className="column-data">
                    <b>{menuDetail.name}</b>
                  </div>
                  <div className="column-data">
                    {dishes.map((dish, index) => (
                      <div class="card">
                        <img
                          src="https://picsum.photos/200"
                          style={{ width: "100%" }}
                        />
                        <div class="container">
                          <h4>
                            <b>{dish.name}</b>
                          </h4>
                          <p>{dish.description}</p>
                          <p>{dish.calories}</p>
                          <p>{dish.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
