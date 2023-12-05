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
import authService from '../services/auth.service';

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState('');
  const navigate = useNavigate()

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setError(false);
    setAlerta('');

    authService.login({ email, password })
      .then((data) => {
        setError(false);
        setAlerta('');
        localStorage.setItem('token', data.token);
        navigate('/', { replace: true });
      })
      .catch(err => {
        setError(true);
        setAlerta(err.msg)
      })
  }, [setError, setAlerta, email, password, navigate]);

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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
              value={password}
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
