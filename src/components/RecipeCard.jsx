import React from 'react'
import { useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';


const RecipeCard = (props) => {

  const [likes, setLikes] = useState(props.cantMeGusta);
  
  const LikeRecipe = (cantidad, id) => {
    fetch(`http://127.0.0.1:8009/api/v1/recetas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-acces-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ "cantMeGusta": cantidad }),
    })
      .then(respuesta => {
        if (respuesta.ok) {
          setLikes(cantidad)
        }
      })
  }
  const handleLikedRecipe = (cantidad, id) => {
    localStorage.getItem('token') ? LikeRecipe(cantidad + 1, id) : ""
  }

  const handleSave = (id, nombreReceta) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    console.log(nombreReceta);
    fetch(`http://127.0.0.1:8009/api/v1/usuarios/${usuario._id}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "nombre_receta": nombreReceta }),
    })
      .then(respuesta => {
        if (respuesta.ok) {
          setLikes(cantidad)
        }
      })
  }

  return (
    <Card sx={{
      maxWidth: 345
    }}>
      <CardMedia
        component="img"
        height="194"
        image={props.img_ruta}
        alt={props.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nombre}
        </Typography>
        <Chip label={props.categoria} />

        <Typography>
          {props.proparacion}
        </Typography>
        <IconButton aria-label="add to favorites" onClick={() => handleLikedRecipe(props.cantMeGusta, props.id)}>
          <FavoriteIcon />
          <Typography>
            {likes}
          </Typography>
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={() => handleSave(props.id, props.nombre)}>
          <BookmarkIcon  />
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/recipes/${props.id}`}>
          <Button size="small" variant="contained" sx={{ backgroundColor: '#775653', }}>
            Ver más
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default RecipeCard