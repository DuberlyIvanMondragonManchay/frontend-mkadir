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
// SUCCESSFULLY
import {Successfully_1} from '../src/components/AlertsMessages'
// FORMS
import FormRegisterPersonalAccount from './components/fomrs/FormRegisterPersonalAccount'
import FormRegisterPersonalData from './components/fomrs/FormRegisterPersonalData'
import ProfilePageIndex from './pages/profile/ProfilePageIndex'
import Navigation from './components/Navigation'
import RestaurantDetailsPage from './pages/restaurant/RestaurantDetailsPage'
import Location from './components/restaurat/Location'
import Menu from './components/restaurat/Menu'
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
          <Route path='/successfully' element={<Successfully_1/>}/>
          <Route path='/profile' element={<ProfilePageIndex/>}/>

          <Route path='/restaurant/details/:name/:id/' element={<RestaurantDetailsPage/>}>
            <Route path='menu' element={<Menu/>}/>
            <Route path='location' element={<Location/>}/>
          </Route>
          
          <Route path='/*' element={<h1>Not found</h1>}/>
        </Routes>
        <Navigation/>
      </RegisterProvider>
    </AuthProvider>
  )
}
