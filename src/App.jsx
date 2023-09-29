import React from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import RegisterAsRestaurant from './pages/register/RegisterAsRestaurant'
import RegisterOptions from './pages/register/RegisterOptions'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'

// FOMRS
import FormRegisterPersonalAccount from './components/fomrs/FormRegisterPersonalAccount'
import FormRegisterPersonalData from './components/fomrs/FormRegisterPersonalData'
export default function App() {
  return (
    <AuthProvider>
      <RegisterProvider>
          <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          {/* GROUP ROUTES REGISTER */}
          <Route path="/register/" element={<RegisterPage />}>
            <Route path="options" element={<RegisterOptions />} />
            <Route path="personal-account" element={<FormRegisterPersonalAccount />} />
            <Route path="personal-data" element={<FormRegisterPersonalData />} />
            <Route path="restaurant" element={<RegisterAsRestaurant />} />
          </Route>
        </Routes>
      </RegisterProvider>
    </AuthProvider>
  )
}
