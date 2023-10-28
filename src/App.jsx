import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'
import Navigation from './components/Navigation'

import Routes from './routes/Routes'

  export default function App() {
    return (
      <AuthProvider>
        <RegisterProvider>
          <RestaurantProvider>
            <MenuProvider>
              <Navigation/>
              <div id='space_navbar' className='py-5 my-10'></div>
              <Routes/>
            </MenuProvider>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
