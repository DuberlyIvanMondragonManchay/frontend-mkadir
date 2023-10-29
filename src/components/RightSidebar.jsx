import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import {FcAdvertising} from 'react-icons/fc'
export default function RightSidebar() {
    const {user} = useAuth()
    const location = useLocation();
    let allowedRoutes  = ['/', '/auth/login', '/auth/register/options','/auth/register/restaurant','/auth/register/personal-data']
    const shouldShowSidebar = allowedRoutes.includes(location.pathname);

    useEffect(() => {
      const spaceSidebar = document.getElementById('right-sidebar-multi-level-sidebar');
  
      if (spaceSidebar) {
        if (user) {
            spaceSidebar.classList.remove('mt-0')
            if (location.pathname === "/") {
            spaceSidebar.classList.add('mt-28');
          } else {
            spaceSidebar.classList.remove('mt-28');
          }
        } else {
          spaceSidebar.classList.remove('mt-0')
          if (location.pathname === "/") {
            spaceSidebar.classList.add('mt-16');
          } else {
            spaceSidebar.classList.remove('mt-16');
          }
        }
      }
    }, [user, location.pathname]);
  
  return (
    <aside id="right-sidebar-multi-level-sidebar" className={`${shouldShowSidebar?"xl:block":null} hidden px-2 bg-white mt-0 fixed top-0 right-0 z-8 w-80 h-screen transition-transform translate-x-full sm:translate-x-0 overflow-y-auto`} aria-label="Right Sidebar">
        <h2 className='flex items-center font-semibold color-text gap-1 mt-6'><FcAdvertising className='text-2xl'/>Publicidad</h2>
    {/* <CarrouselComponent/> */}
    {/* <RestaurantDoc/> */}
  </aside>
  )
}
