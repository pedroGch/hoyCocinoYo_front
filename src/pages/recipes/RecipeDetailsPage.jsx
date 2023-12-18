import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Divider, Typography, Chip } from '@mui/material'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const RecipeDetailsPage = () => {

    const [recipe, setRecipe] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getRecipe = async () => {
            const response = await fetch(`http://127.0.0.1:8009/api/v1/recetas/${id}`)
            const data = await response.json()
            setRecipe(data)
        }
        getRecipe();
    }, [id])

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: "90px" }}>
                <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
                    {recipe.nombre}
                </Typography>
                <Chip sx={{ display: 'flex', justifyContent: 'center', width: '100px', margin: 'auto' }} label={recipe.categoria} />
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: "15px", marginBottom: "30px" }}>
                    <img
                        src={`/${recipe.imagen_ruta}`}
                        height={150}
                        width={150}
                        alt={`Receta de ${recipe.nombre}`}
                        loading="lazy"
                    />
                </Box>
                <Divider />
                <Typography sx={{ textAlign: 'left' }} variant="h6" gutterBottom>
                    Ingredientes
                </Typography>
                <Box sx={{ margin: 'auto', marginTop: "15px", marginBottom: "30px" }}>
                    {recipe.ingredientes?.map((ingrediente, index) => (
                        <Chip key={index} label={`${ingrediente.nombre}, ${ingrediente.cantidad} ${ingrediente.unidad}`} />
                    ))}
                </Box>
                <Typography sx={{ textAlign: 'left' }} variant="h6" gutterBottom>
                    Preparacion
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: "15px", marginBottom: "30px" }}>
                    <Typography sx={{ textAlign: 'left' }} variant="p" gutterBottom>
                        {recipe.preparacion}
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default RecipeDetailsPage