import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Error from '../components/Error';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()

  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    const datos = JSON.stringify({ email, password, username })

    if (!username || !email || !password) {
      setError(true);
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setError(false);
    setAlerta('');

    fetch('http://127.0.0.1:8009/api/v1/usuarios/registrar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: datos
    })
      .then(respuesta => {
        if (respuesta.ok) {
          navigate('/login', { replace: true })
        } else {
          setError(true);
          setAlerta("Algo está mal, verificá si el correo electrónico que estás ingresando tiene un formato correcto o si ya existe una cuenta con esa direcciónx");
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
            Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {error && <Error>{alerta}</Error>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Box sx={{ mt: 3 }}>
                  <Link to="/login">
                    ¿Ya tenés una cuenta? Inicia sesión
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