import React from 'react'
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Chip,
    Button
} from '@mui/material'

const RecipeCard = () => {
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
                    Panqueques
                </Typography>
                <Chip label="Receta dulce" />
                <Divider sx={{
                    marginTop: 2,
                    marginBottom: 2
                }} />
                <Typography>
                    Descripción breve
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" variant="contained">
                    Ver más
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecipeCard