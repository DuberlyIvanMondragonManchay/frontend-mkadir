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
                <Routes/>  
              <RightSidebar/>
              
            </MenuProvider>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
