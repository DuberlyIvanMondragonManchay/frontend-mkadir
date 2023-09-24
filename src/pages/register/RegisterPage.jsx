import React from 'react'
import { Link, Navigate, Outlet,redirect,useLocation } from 'react-router-dom'
import { Icon_AiOutlineArrowLeft } from '../../components/IconsComponents'
export default function RegisterPage() {
  const use_location = useLocation()
  if(use_location.pathname === "/register/" || use_location.pathname === "/register"){
    console.log(true)
    return <Navigate to="/register/options" />;
  }
  console.log(use_location.pathname)
  return (
    <div className='m-2 mt-3'>
      <Link to="/register/options"><Icon_AiOutlineArrowLeft/></Link>
      <h2 className='text-2xl font-bold color-text text-center'>Registrarse</h2>
      <Outlet/>
    </div>
  )
}
