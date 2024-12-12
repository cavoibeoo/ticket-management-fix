import React from 'react'
import { Login } from '../features/auth/components/Login'
import { Navbar } from '../features/Navigation/components/Navbar'

export const LoginPage = () => {
  return (
    <>
    <Navbar/>
    <Login/>
    </>
  )
}
