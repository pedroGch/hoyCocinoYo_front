import React from 'react'
import { Container, Divider, Typography } from '@mui/material'

const Footer = () => {
    return (
        <footer>
            <Container sx={{
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
                textAlign: 'center',
                padding: '1rem 0',
            }}>
                <Divider sx={{
                    marginBottom: '1rem'
                }} />
                <Typography variant="body2" color="text.secondary" align="center">
                    Copyright © hoyCocinoYo | 2023
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer