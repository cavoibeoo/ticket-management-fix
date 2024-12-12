import React from 'react'
import { selectLoggedInUser } from '../AuthSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectedAdmin = ({children}) => {


    const loggedInUser=useSelector(selectLoggedInUser)

    if(!loggedInUser){
        return <Navigate to={'/login'}></Navigate>
    }

    if(loggedInUser && loggedInUser.role!=='admin'){
        return <Navigate to={'/'}></Navigate>
    }
    return children
}
