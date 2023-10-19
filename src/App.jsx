import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'
import Navigation from './components/Navigation'

import Routes from './routes/Routes'

  export default function App() {
    return (
      <AuthProvider>
        <RegisterProvider>
            <Routes/>
          <div className='py-5 my-9'></div>
          <Navigation/>
        </RegisterProvider>
      </AuthProvider>
    )
  }
