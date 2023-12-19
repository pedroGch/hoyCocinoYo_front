import React from 'react'
import API from "../services/api.service";
import { useState, useEffect } from 'react';
import { Divider, Grid, Box, Container, Button, Typography, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";

const HeroUpload = () => {
  const navigate = useNavigate();

  const { id } = useParams()
  useEffect(() => { 
    const getRecipe = async () => {
      console.log(`este es el id: ${id}`);
      if (id){
        const response = await API.call({uri: `recetas/${id}`, method: 'GET', body: undefined})   
        delete response._id
        console.log(response);
        setNombre(response.nombre)
        setCategoria(response.categoria)
        setPreparacion(response.preparacion)
        setIngredientes([...response.ingredientes])
      }
    }
    getRecipe();
  }, [id]);
  
  const [nombre, setNombre] = useState('');
  const handleChangeNombre = (e) => {
    setNombre(e.target.value)
  }

  const [unidad, setUnidad] = React.useState('');
  const handleChangeUnidad = (e) => {
    setUnidad(e.target.value);
  };

  const [categoria, setCategoria] = React.useState('');
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const [preparacion, setPreparacion] = useState('');
  const handleChangePreparacion = (e) => {
    setPreparacion(e.target.value);
  }

  const [ingredientes, setIngredientes] = useState([]);

  const [ingNombre, setIngNombre] = useState('');
  const handleChangeIngNombre = (e) => {
    setIngNombre(e.target.value);
  }

  const [ingCantidad, setIngCantidad] = useState('');
  const handleChangeIngCantidad = (e) => {
    setIngCantidad(e.target.value); 
  }

  const agregarIngrediente = () => {
    setIngredientes(prevIngredientes => [...prevIngredientes, { id: prevIngredientes.length + 1, nombre: ingNombre, cantidad: ingCantidad, unidad: unidad }]);
    setIngNombre('');
    setIngCantidad('');
    setUnidad('');
  }

  const eliminarIngrediente = (id) => {
    setIngredientes(prevIngredientes => prevIngredientes.filter(ingrediente => ingrediente.id !== id));
  };

  const [imagen, setImagen] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    let data = {
      nombre: '', 
      categoria:'', 
      ingredientes: [],  
      preparacion:''
    }
    data.nombre = nombre;
    data.categoria = categoria;
    data.ingredientes = [...ingredientes]
    data.preparacion = preparacion;
    if (!id){
      data.id_usuario = usuario._id;
      data.imagen = imagen;
      data.alt = `Imagen de receta de ${nombre}`;
    }

    try {
      let response;
      if (id){
        response = await API.call(
          {
            uri: `recetas/${id}`,
            method: 'PUT',
            body: data
          }
        )       
      }else{
        response = await API.call(
          {
            uri: `recetas`,
            method: 'POST',
            body: data
          }
        )
      }
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
          setNombre('');
          setPreparacion('');
          setCategoria('');
          setIngNombre('');
          setIngCantidad('');
          setUnidad('');
          setIngredientes([]);
          setImagen('');
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          navigate('/')
        }
        });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Te faltaron completar algunos campos...",
        text: error.respose.data,
      });
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
            <TextField sx={{ width: '45%', paddingRight: '1rem' }} id="recetaNombre" label="Nombre de la receta" variant="standard" onChange={handleChangeNombre} value={nombre} />
            <FormControl variant="standard" sx={{ width: '45%', paddingRight: '1rem' }}>
              <InputLabel id="recetaCategoria">Categoría</InputLabel>
              <Select
                id="recetaCategoria"
                value={categoria}
                defaultValue={categoria}
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
                <TextField fullWidth id="ingNombre" value={ingNombre} onChange={handleChangeIngNombre} label="Nombre del ingrediente" variant="standard" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth id="ingCantidad" value={ingCantidad} onChange={handleChangeIngCantidad} label="Cantidad" variant="standard" />
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
                    <MenuItem value="Niguna">
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
              <TextField fullWidth label="Preparación" id="recetaPreparacion" onChange={handleChangePreparacion} value={preparacion} />
            </Grid>
            <Grid container>
              <Button fullWidth sx={{ backgroundColor: '#775653', }} component="label" variant="contained">
                Subir archivo
                <input filename={imagen} onChange={e => setImagen(e.target.files[0])}
                  type='file'
                  accept='image/*' />
              </Button>
            </Grid>
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