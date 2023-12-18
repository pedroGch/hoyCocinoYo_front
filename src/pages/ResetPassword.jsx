import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom'
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
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState('');
  const navigate = useNavigate()
  const { id, token } = useParams()

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);


  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (!password) {
      setError(true);
      setAlerta('La contraseña es necesario');
      return;
    }
    setError(false);
    setAlerta(``);
    const datos = {
      'password' : password
    }
    fetch(`http://127.0.0.1:8009/api/v1/usuarios/${id}/${token}/restituir-password`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(respuesta => {
        if (respuesta.ok) {
          setError(true);
          setAlerta("Tu contraseña fue restituida correctamente");
          setPassword('')
          navigate('/login')
        } else {
          setError(true);
          setAlerta("Algo salio mal, vuelve a intentarlo más tarde");
        }
      })
      .catch(err => {
        alert(err);
      });

  }, [setError, setAlerta, password, navigate]);

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
          Escribe tu nueva contraseña
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Nueva contraseña"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
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
              Restablecer
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
