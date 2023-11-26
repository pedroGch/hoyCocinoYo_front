import React from 'react'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Grid, Box, Container, Button, Typography, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const HeroUpload = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const [unidad, setUnidad] = React.useState('');
  const [categoria, setCategoria] = React.useState('');
  const [ingredientes, setIngredientes] = useState([])

  const agregarIngrediente = () => {
    const nuevoIngrediente = {
      "id": ingredientes.length + 1,
      "nombre" : document.getElementById('ingNombre').value,
      "cantidad" : document.getElementById('ingCantidad').value,
      "unidad" : unidad
    }
    setIngredientes(prevIngredientes => [...prevIngredientes, nuevoIngrediente]);
  }
  const handleSubmit = (event) => {
    const recetaNombre = document.getElementById('recetaNombre').value

    alert(categoria)
    //const datos = JSON.stringify({email, password, username})
  }
  const handleChangeUnidad = (event) => {
    setUnidad(event.target.value);
  };
  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };
  const eliminarIngrediente = (id) => {
    // Lógica para eliminar el ingrediente con el id proporcionado
    setIngredientes(prevIngredientes => prevIngredientes.filter(ingrediente => ingrediente.id !== id));
  };
  return (
    <section>
      <Container sx={{
        marginTop: '5rem'
      }}>
        <Box sx={{
          backgroundColor: '#775653',
          margin: '0 auto',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Typography sx={{
            xs: {
              fontSize: '1.2rem'
            },
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Ingresar receta</Typography>
        </Box>
        <Box component="form" noValidate  >
          
            <Box sx={{
              marginBottom: '2rem',
              justifyContent: 'center',
            }}>
              <TextField sx={{ width: '45%', paddingRight: '1rem' }} id="recetaNombre" label="Nombre de la receta" variant="standard" />
                <FormControl variant="standard" sx={{ width: '45%', paddingRight: '1rem' }}>
                  <InputLabel id="recetaCategoria">Categoría</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={categoria}
                    onChange={handleChangeCategoria}
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>Categoría</em>
                    </MenuItem>
                    <MenuItem value={'Dulce'}>Dulce</MenuItem>
                    <MenuItem value={'Salado'}>Salado</MenuItem>
                    <MenuItem value={'Fit'}>Fit</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{
                backgroundColor: '#775653',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}>
                <Typography sx={{
                  xs: {
                    fontSize: '1.2rem',
                    textAlign: 'center'
                  },
                  color: 'white',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Ingredientes</Typography>
              </Box>
              <Box sx={{ marginBottom: '2rem', marginTop: '2rem'}}>
              {ingredientes.map(ingrediente => (
                <Grid item key={ingrediente.id} xs={12} md={12} lg={12}>
                  <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.nombre}</Typography>
                  <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.cantidad}</Typography>
                  <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.unidad}</Typography>
                  <Button onClick={() => eliminarIngrediente(ingrediente.id)} sx={{ backgroundColor: '#775653', marginRight:'2rem'}} component="label" variant="contained" >
                    Eliminar
                  </Button>
                  <Divider sx={{
                    marginTop: '1.2rem',
                    marginBottom: '1.2rem'
                  }} />
                </Grid>
              ))}
              </Box>
              <Box sx={{
                marginBottom: '2rem',
                justifyContent: 'center',
              }}>
                <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth id="ingNombre" label="Nombre del ingrediente" variant="standard" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth id="ingCantidad" label="Cantidad" variant="standard" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="ingUnidad">Unidad</InputLabel>
                        <Select
                          labelId="ingUnidad"
                          id="demo-simple-select-standard"
                          value={unidad}
                          onChange={handleChangeUnidad}
                          label="Unidad"
                        >
                          <MenuItem value="">
                            <em>Ninguna</em>
                          </MenuItem>
                          <MenuItem value={'aGusto'}>a gusto</MenuItem>
                          <MenuItem value={'kg'}>kg</MenuItem>
                          <MenuItem value={'unidades'}>un</MenuItem>
                          <MenuItem value={'gr'}>gr</MenuItem>
                          <MenuItem value={'lt'}>lt</MenuItem>
                          <MenuItem value={'ml'}>ml</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={agregarIngrediente} variant="contained" sx={{ backgroundColor: '#775653', }}>Agregar ingrediente</Button>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginBottom: '2rem' }}>
                  <TextField fullWidth label="Preparación" id="recetaPreparacion" />
                </Grid>
                <Grid container>
                  <Button fullWidth sx={{ backgroundColor: '#775653', }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Subir archivo
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Grid>
                <Grid container sx={{marginTop:'2rem'}}>
                  <Button onClick={handleSubmit} sx={{ backgroundColor: '#775653', marginRight:'2rem'}} component="label" variant="contained" >
                    Guardar
                  </Button>

                </Grid>
              </Box>

        </Box>
      </Container>
    </section>
  )
}

export default HeroUpload