import React from 'react'
import { Navbar } from '../features/Navigation/components/Navbar'
import { ProjectList } from '../features/projects/components/ProjectList'

export const AdminDashBoard = () => {
  return (
    <>
    <Navbar/>
    <ProjectList/>
    </>
  )
}
