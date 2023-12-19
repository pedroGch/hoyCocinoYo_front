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
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
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