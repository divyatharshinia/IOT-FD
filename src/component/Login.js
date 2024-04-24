import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus("");
    try {
      const response = await axios.post('http://192.168.1.10:8000/api/login', formData);
      // const response = {
      //   status: 200,
      //   data: {
      //     message: "Login successful",
      //     Token: "cdd8d0780962e86884a857e0bf9f2c11e39dbba9",
      //     id: 6,
      //   },
      // };
      if (response.status === 200) {
        localStorage.setItem("token", response.data.Token);
        localStorage.setItem("userId", response.data.id);
        alert("User login successfully.");
        navigate("/dashboard");
      }
      // const { username } = response.data;

      // localStorage.setItem('id', response.data.id); save id while login
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("Error logging in. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-text">Login</h2>
          <br></br>

          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <br></br>
          <br></br>

          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />
          <br></br>
          <br></br>
          <button className="login-button" type="submit">
            Submit
          </button>

          <p className="signup-text">
            {" "}
            Not a member? <span className="sgnup">Signup now</span>
          </p>
        </form>
        {loginStatus && <div className="loginStatus">{loginStatus}</div>}
      </div>
    </>
  );
};

export default Login;
