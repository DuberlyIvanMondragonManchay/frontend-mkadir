import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function IsAuthenticated() {
    const {user,isLoading} = useAuth()
    if(isLoading) return <h1>Loading...</h1> 
    if(user)return <Navigate to={"/profile"}/>
    return <Outlet/>
}
