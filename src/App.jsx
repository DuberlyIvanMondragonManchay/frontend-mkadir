import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'
import { RestaurantProvider } from './context/RestaurantContext'
import Navigation from './components/Navigation'

import Routes from './routes/Routes'

  export default function App() {
    return (
      <AuthProvider>
        <RegisterProvider>
          <RestaurantProvider>
            <Routes/>
            <div className='py-5 my-9'></div>
            <Navigation/>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
