import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "../api/axios";
const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd)
    if (user === "Doc" && pwd === "SIMI"){
      setAuth({user, pwd}); // Agregar Rol (Médico, Farmacéutico) de ser necesario
      console.log(user, pwd);
      navigate(from, { replace: true });
    }
    // try {
    //   const response = await axios.post(LOGIN_URL, // Axios hace un POST al "backend" para validar las credenciales
    //     JSON.stringify({user:user, password:pwd}),
    //     {
    //       headers: {'Content-Type': 'application/json'},
    //       withCredentials: true
    //     }
    //   );
    //   console.log(JSON.stringify(response?.data));
    //   const accessToken = response?.data?.accessToken;
    //   const roles = response?.data?.roles; //Aquí se obtiene el rol de médico o farmaceutico
    //   setAuth({user, pwd, roles, accessToken});
    //   console.log(user, pwd);
    // } catch (error) {
    //   //algo
    // }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Box display="flex" 
        flexDirection={'column'}
        style={{maxWith: '400px'}}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={0.5}
        borderRadius={1}>
          <Typography>Arri plearri</Typography>
          <TextField margin="normal" type={'mail'} variant='outlined' placeholder="Correo" 
            name="Username"
            value={user}
            required
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField margin="normal" type={'password'} variant='outlined' placeholder="Contraseña"
            name="Password"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button type="submit" sx={{marginTop: 0.5, borderRadius: 1}} variant="contained" color="primary" >Login</Button>
        </Box>
        {/* <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="Username"
          value={user}
          required
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="Password"
          value={pwd}
          required
          onChange={(e) => setPwd(e.target.value)}
        />
        <button>Sign In</button> */}
      </form>
    </div>
  )
};

export default Login;