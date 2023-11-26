import React from 'react'
import { Alert, AlertTitle } from '@mui/material';

const Error = ({ children }) => {
    return (
        <Alert severity="error">
            <AlertTitle>{children.title}</AlertTitle>
            {children.description}
        </Alert>
    )
}

export default Error