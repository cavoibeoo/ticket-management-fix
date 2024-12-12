import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const Logout = () => {

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(logoutUserAsync())
    },[])

    const user=useSelector(selectLoggedInUser)

  return (
    <>
    {!user && <Navigate to={'/login'} replace={true}></Navigate>}
    <div>Logout</div>
    </>
  )
}
