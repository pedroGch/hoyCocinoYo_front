import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Divider,
    Chip,
    Button
} from '@mui/material'

const RecipeCard = (props) => {
    return (
        <Card sx={{
            maxWidth: 345
        }}>
            <CardMedia
                component="img"
                height="194"
                image="/panqueque.jpg"
                alt="Panqueque"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.nombre}
                </Typography>
                <Chip label="Receta dulce" />
                <Divider sx={{
                    marginTop: 2,
                    marginBottom: 2
                }} />
                <Typography>
                    {props.proparacion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" variant="contained"sx={{ backgroundColor: '#775653',}} >                    Ver más
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecipeCard