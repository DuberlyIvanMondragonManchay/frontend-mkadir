import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import {FcAdvertising} from 'react-icons/fc'
export default function RightSidebar() {
    const {user} = useAuth()
    const location = useLocation();
    let allowedRoutes  = ['/', '/auth/login', '/auth/register/options','/auth/register/restaurant','/auth/register/personal-data']
    useEffect(() => {
      const spaceSidebar = document.getElementById('space_sidebar');
      
      // Agrega o quita la clase xl:mr-64 basándose en location.pathname y user
      if (spaceSidebar) {
        if (allowedRoutes.includes(location.pathname)) {
          spaceSidebar.classList.add('xl:mr-64');
        } else {
          spaceSidebar.classList.remove('xl:mr-64');
        }
      }
    }, [user, location.pathname]);
  return (
    <aside id="right-sidebar-multi-level-sidebar" className={`${user?location.pathname!="/"?"hidden":null:null} px-2 bg-white mt-0 fixed top-24 right-0 z-8 w-80 h-screen transition-transform translate-x-full xl:translate-x-0 overflow-y-auto`} aria-label="Right Sidebar">
        <h2 className='flex items-center font-semibold color-text gap-1 mt-6'><FcAdvertising className='text-2xl'/>Publicidad</h2>
    {/* <CarrouselComponent/> */}
    {/* <RestaurantDoc/> */}
  </aside>
  )
}
