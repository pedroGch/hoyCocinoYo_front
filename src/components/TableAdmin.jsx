import React from 'react'
import { capitalize } from "../helpers";
import { Box, Container, Divider, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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


const TableAdmin = () => {



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
                    }}>Administrar recetas</Typography>
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
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right"><ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button>Ver</Button>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </ButtonGroup></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </section>
    )
}

export default TableAdmin