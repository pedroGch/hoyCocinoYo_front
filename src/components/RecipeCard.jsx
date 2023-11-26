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
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                  <Typography>
                    {props.cantMeGusta}
                </Typography> 
                </IconButton>  
                <IconButton aria-label="add to favorites">
                  <BookmarkIcon />
                </IconButton>                 
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" variant="contained"sx={{ backgroundColor: '#775653',}} >                    
                  Ver más
                </Button>
            </CardActions>
        </Card>
    )
}

export default RecipeCard