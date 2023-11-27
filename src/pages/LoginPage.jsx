import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Error from '../components/Error';

const defaultTheme = createTheme();

export default function SignIn() {
  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const datos = JSON.stringify({ email, password })

    if (!email || !password) {
      setError(true);
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setError(false);
    setAlerta('');

    fetch('http://127.0.0.1:8009/api/v1/usuarios/iniciar-sesion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-acces-token': localStorage.getItem('token')
      },
      body: datos
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('usuario', JSON.stringify(res));
          navigate('/', { replace: true })
        } else {
          setError(true);
          setAlerta("Algo está mal, verificá tus datos");
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component='img' sx={{
            height: '200px',
            width: 'auto'
          }} alt='Logo' src='/logo.png'></Box>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && <Error>{alerta}</Error>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Box sx={{ mt: 3 }}>
                  <Link to="/register">
                    ¿No tenés cuenta todavía? Registrate
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
