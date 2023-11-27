import React from 'react'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Grid, Box, Container, Button, Typography, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const HeroUpload = () => {
  const navigate = useNavigate()
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
  const handleChangeUnidad = (e) => {
    setUnidad(e.target.value);
  };

  const [categoria, setCategoria] = React.useState('');
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const [ingredientes, setIngredientes] = useState([])
  const agregarIngrediente = () => {
    const nuevoIngrediente = {
      "id": ingredientes.length + 1,
      "nombre": document.getElementById('ingNombre').value,
      "cantidad": document.getElementById('ingCantidad').value,
      "unidad": unidad
    }
    setIngredientes(prevIngredientes => [...prevIngredientes, nuevoIngrediente]);

    document.getElementById('ingNombre').value = '';
    document.getElementById('ingCantidad').value = '';
    setUnidad('');
  }
  const eliminarIngrediente = (id) => {
    // Lógica para eliminar el ingrediente con el id proporcionado
    setIngredientes(prevIngredientes => prevIngredientes.filter(ingrediente => ingrediente.id !== id));
  };

  const handleSubmit = async (e) => {
    // Envio de datos al backend
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const data = JSON.stringify({
      "id_usuario" : usuario._id,
      "nombre": document.getElementById('recetaNombre').value,
      "categoria": categoria,
      "ingredientes": ingredientes,
      "preparacion": document.getElementById('recetaPreparacion').value,
      "imagen_ruta": "receta-predeterminada.jpg",
      //"alt": "receta generica",

    });

    try {
      const  response = await fetch('http://127.0.0.1:8009/api/v1/recetas/crear', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-acces-token': localStorage.getItem('token')
        },
        body: data,
      });
      
      if (response.ok) {
        Swal.fire({
          title: "Agregaste un nueva receta",
          text: "¿Querés agregar otra?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No, ¡así estoy bien!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //tengo que limpiar el formulario
            document.getElementById('recetaNombre').value = ''
            document.getElementById('recetaPreparacion').value = ''
            setCategoria('');
            document.getElementById('ingNombre').value = '';
            document.getElementById('ingCantidad').value = '';
            setUnidad('');
            setCategoria([])
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            navigate('/')
          }
        });
      }else{
        const respuesta = await response.json()
        const mensaje = respuesta.errors.map(error => `* ${error}`).join('\n');
        Swal.fire({
          icon: "error",
          title: "Te Faltaron completar algunos campos...",
          text: mensaje,
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
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
        <Box component="form" noValidate>

          <Box sx={{
            marginBottom: '2rem',
            justifyContent: 'center',
          }}>
            <TextField sx={{ width: '45%', paddingRight: '1rem' }} id="recetaNombre" label="Nombre de la receta" variant="standard" />
            <FormControl variant="standard" sx={{ width: '45%', paddingRight: '1rem' }}>
              <InputLabel id="recetaCategoria">Categoría</InputLabel>
              <Select
                id="recetaCategoria"
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
          <Box sx={{ marginBottom: '2rem', marginTop: '2rem' }}>
            {ingredientes.map(ingrediente => (
              <Grid item key={ingrediente.id} xs={12} md={12} lg={12}>
                <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.nombre}</Typography>
                <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.cantidad}</Typography>
                <Typography variant="body1" component="span" sx={{ display: 'inline', marginRight: '1.2rem' }}>{ingrediente.unidad}</Typography>
                <Button onClick={() => eliminarIngrediente(ingrediente.id)} sx={{ backgroundColor: '#775653', marginRight: '2rem' }} component="label" variant="contained" >
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
            {/* <Grid container>
              <Button fullWidth sx={{ backgroundColor: '#775653', }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Subir archivo
                <VisuallyHiddenInput type="file" id="imagen_ruta" />
              </Button>
            </Grid> */}
            <Grid container sx={{ marginTop: '2rem' }}>
              <Button onClick={handleSubmit} sx={{ backgroundColor: '#775653', marginRight: '2rem' }} component="label" variant="contained" >
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