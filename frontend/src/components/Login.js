import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ username: "Doc", password: "SIMI" }];
  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      console.log("redirecting...")
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <p>Welcome Back</p>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        name="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
      </form>
    </div>
  )
};

export default Login;