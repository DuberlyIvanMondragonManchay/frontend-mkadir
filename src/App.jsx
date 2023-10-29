import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'
import Navigation from './components/Navigation'

import Routes from './routes/Routes'
import SidebarComonent from './components/SidebarComonent'
import RightSidebar from './components/RightSidebar'

  export default function App() {
    return (
      <AuthProvider>
        <RegisterProvider>
          <RestaurantProvider>
            <MenuProvider>
              <Navigation/>
              <SidebarComonent/>
              <div id='space_navbar' className='py-5 my-2'></div>
              <div className="md:p-4 sm:ml-52 xl:mr-64">
                <Routes/>  
              </div>
              <RightSidebar/>
              
            </MenuProvider>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
