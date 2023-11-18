import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import RecipeCard from './RecipeCard'

const Hero = () => {
    return (
        <section>
            <Container>
                <Typography sx={{
                    xs: {
                        fontSize: '1.5rem'
                    },
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '6rem'
                }}>Te damos la bienvenida a tu libro de recetas</Typography>
                <Divider sx={{
                    marginTop: '2rem',
                    marginBottom: '2rem'
                }} />
                <Box sx={{
                    backgroundColor: '#775653',
                    margin: '0 auto',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{
                        xs: {
                            fontSize: '1.2rem'
                        },
                        color: 'white',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>Recetas que te recomendamos</Typography>
                </Box>
                <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                    <Grid item xs={12} md={6} lg={4}>
                        <RecipeCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <RecipeCard />
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default Hero