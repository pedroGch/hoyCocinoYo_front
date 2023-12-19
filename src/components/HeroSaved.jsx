
import React from 'react'
import { useEffect, useState } from "react";
import { capitalize } from "../helpers";
import { Box, Container, Divider, Typography, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const HeroSaved =  () => {
    const [recetas, setRecetas] = useState([]);

    const user = JSON.parse(localStorage.getItem('usuario'))

    const id_usuario = user._id;
    useEffect(() => {
        fetch(`http://127.0.0.1:8009/api/v1/usuarios/${id_usuario}`)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('Error en el servidor')
                }
                return respuesta.json();
            })
            .then(res => {
                setRecetas(res.mis_recetas);
            })
            .catch(err => {
                alert(err);
            });
    }, []);



    const handleClickEliminar = (id) => {
        Swal.fire({
            title: "¿Estás seguro que deseás borrar la receta?",
            text: `Una vez eliminada, no podrás recuperarla.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                fetch(`http://127.0.0.1:8009/api/v1/recetas/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'x-acces-token': token
                    }
                })
                    .then(respuesta => {
                        if (!respuesta.ok) {
                            throw new Error('Error en el servidor')
                        }
                        Swal.fire({
                            title: "Borrada!",
                            text: "Tu receta ha sido borrada con éxito.",
                            icon: "success"
                        });
                        setRecetas(recetas.filter(receta => receta._id !== id));
                        return respuesta.json();
                    })

            }
        });


    };


    return (
        <section>
            <Container sx={{
                marginTop: '5rem'
            }}>
                <Typography sx={{
                    xs: {
                        fontSize: '1.5rem'
                    },
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '6rem'
                }}>Panel de Administración</Typography>
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
                    }}>Tus recetas guardadas</Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Receta</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recetas.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <p>Aún no has cargado ninguna receta.</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recetas.map((receta) => (
                                    <TableRow
                                        key={receta.nombre_receta}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {receta.nombre_receta}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Link to={`/recipes/${receta.id_receta}`}>
                                                    <Button>Ver</Button>
                                                </Link>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </section>
    )
}

export default HeroSaved