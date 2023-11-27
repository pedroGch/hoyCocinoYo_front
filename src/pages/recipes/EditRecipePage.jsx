import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Divider, Typography, Chip } from '@mui/material'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import EditForm from '../../components/EditForm'

const EditRecipePage = () => {
  return (
    <>
      <Navbar />
      <EditForm />
      <Footer />
    </>
  )
}

export default EditRecipePage