import React from 'react'
import {Navigate, Outlet,useLocation } from 'react-router-dom'
export default function RegisterPage() {
  const use_location = useLocation()
  if(use_location.pathname === "/register/" || use_location.pathname === "/register"){
    return <Navigate to="/register/options" />
  }
  return (
    <div className='m-2 mt-3'>
      <h2 className='text-2xl font-bold color-text text-center'>Registrarse</h2>
      <Outlet/>
    </div>
  )
}