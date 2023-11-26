import React from 'react'
import { Alert } from '@mui/material';

const Error = ({ children }) => {
    return (
        <Alert severity="error">
            {children}
        </Alert>
    )
}

export default Error