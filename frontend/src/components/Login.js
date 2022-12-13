import React from 'react';
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography,
  FormControl, MenuItem, Select, InputLabel,
  Alert,
} from "@mui/material";
//import {useQuery, gql} from '@apollo/client';
// import data_login from "../mocking/data_login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [tipo, setTipo] = useState('medico');
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Versión mock data */
    // try {
    //   if (data_login.some(usuario => (usuario.tipo === tipo && usuario.nombre === user && usuario.pass === pwd))){
    //     setAuth({user, pwd, tipo});
    //     setCorrect(true);
    //     setError(false);
    //     navigate(from, { replace: true });
    //   } else {
    //     setCorrect(false);
    //     setError(true);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    /* Versión Axios */
    // try {
    //   const response = await axios.post('http://localhost:8090/graphql', // Axios hace un POST al "backend" para validar las credenciales
    //     {
    //       query: `
    //       query login{
    //         login(email: "${user}", pass: "${pwd}", tipo: "${tipo}") {
    //           userId
    //           token
    //           tokenExpiration
    //         }
    //       }
    //       `
    //     },
    //     {
    //       headers: {'Content-Type': 'application/json'},
    //       withCredentials: true
    //     }
    //   );
    //   console.log(JSON.stringify(response?.data));
    //   const token = response?.data?.token;
    //   setAuth({user, pwd, token});
    //   console.log(user, pwd);
    // } catch (error) {
    //   //algo
    // }

    /* Versión fetch */
    const requestBody = {
      query:`query login{
          login(email: "${user}", pass: "${pwd}", tipo: "${tipo}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }
    await fetch('http://localhost:8090/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      if (result.ok){
        return result.json();
      }
      setCorrect(false);
      setError(true);
      throw new Error('Something went wrong');
    })
    .then(data => {
      const token = data.token;

      setAuth({user, pwd, token,tipo});
      console.log("Login correcto");
      setCorrect(true);
      setError(false);
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Box display="flex" 
        flexDirection={'column'}
        style={{maxWidth: '400px'}}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={0.5}
        borderRadius={1}>
          <Typography>Iniciar Sesión</Typography>
          <FormControl fullWidth>
              <InputLabel id="select-label">Tipo de cuenta</InputLabel>
              <Select required labelId="select-label" id="select" label="Tipo de cuenta" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <MenuItem value="medico"><Typography>Medico</Typography></MenuItem>
                <MenuItem value="farmaceutico"><Typography>Farmaceutico</Typography></MenuItem>
              </Select>
            </FormControl>
          <TextField margin="normal" type={'username'} variant='outlined' placeholder="Usuario" 
            name="Username"
            value={user}
            required
            fullWidth
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField margin="normal" type={'password'} variant='outlined' placeholder="Contraseña"
            name="Password"
            value={pwd}
            required
            fullWidth
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button type="submit" sx={{marginTop: 0.5, borderRadius: 1}} variant="contained" color="primary" >Login</Button>
          {correct && (
              <Alert severity="success">
                Sesión Iniciada
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                Usuario o Contraseña Incorrecta
              </Alert>
            )}
        </Box>
      </form>
    </div>
  )
};

export default Login;