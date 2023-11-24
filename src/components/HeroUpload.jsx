import React from 'react'
import { styled } from '@mui/material/styles';
import { Grid, Box, Container, Button, Typography, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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
                <Box>
                    <form action="">
                        <Box sx={{
                            marginBottom: '2rem',
                            justifyContent: 'center',
                        }}>
                            <TextField sx={{ width: '45%', paddingRight: '1rem' }} id="standard-basic" label="Standard" variant="standard" />
                            <FormControl variant="standard" sx={{ width: '45%', paddingRight: '1rem' }}>
                                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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

                        <Box sx={{
                            marginBottom: '2rem',
                            justifyContent: 'center',
                        }}>
                            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={age}
                                            onChange={handleChange}
                                            label="Age"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" sx={{ backgroundColor: '#775653', }}>Agregar ingrediente</Button>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginBottom: '2rem' }}>
                                <TextField fullWidth label="fullWidth" id="fullWidth" />
                            </Grid>
                            <Grid container>
                                <Button fullWidth sx={{ backgroundColor: '#775653', }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Subir archivo
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Grid>
                        </Box>
                    </form>
                </Box>
            </Container>
        </section>
    )
}

export default HeroUpload