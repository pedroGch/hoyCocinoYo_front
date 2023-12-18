import React, { useCallback, useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState('');
  const navigate = useNavigate()

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);


  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (!email) {
      setError(true);
      setAlerta('El campo Email es necesario');
      return;
    }
    setError(false);
    setAlerta('');
    const datos = {
      'email' : email
    }
    fetch('http://127.0.0.1:8009/api/v1/usuarios/recuperar-password', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(respuesta => {
        if (respuesta.ok) {
          setError(true);
          setAlerta("Te enviamos un link para recuperar tu contraseña, verifica tu email");
          setEmail('')
        } else {
          setError(true);
          setAlerta("Algo está mal, verificá si el correo electrónico que estás ingresando tiene un formato correcto o si ya existe una cuenta con esa dirección");
        }
      })
      .catch(err => {
        alert(err);
      });

  }, [setError, setAlerta, email, navigate]);

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
            Recupera tu contraseña
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={onChangeEmail}
              value={email}
            />
            {error && <Error>{alerta}</Error>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar contraseña
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
