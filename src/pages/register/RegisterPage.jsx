import React ,{useEffect} from 'react'
import {Navigate, Outlet,useLocation } from 'react-router-dom'
export default function RegisterPage() {
  const use_location = useLocation()
  if(use_location.pathname === "/auth/register/" || use_location.pathname === "/register"){
    return <Navigate to="/auth/register/options" />
  }
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = '¿Estás seguro de que quieres abandonar la página?';
      event.returnValue = confirmationMessage; // Estándar para la mayoría de los navegadores
      return confirmationMessage; // Necesario para algunos navegadores, por ejemplo, Firefox
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <div className='m-2 mt-3'>
      <h2 className='text-2xl font-bold color-text text-center'>Registrarse</h2>
      <Outlet/>
    </div>
  )
}