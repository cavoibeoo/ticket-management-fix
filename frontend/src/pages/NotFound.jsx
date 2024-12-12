import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} height={'100vh'} spacing={2}>
      <Typography variant='h6' fontWeight={400}>We coudn't find the page you were looking for😓</Typography>
      <Button component={Link} to={"/"} variant='outlined'>Go to Home</Button>
    </Stack>
  )
}
