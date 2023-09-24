import React from 'react'
import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import RegisterAsRestaurant from './pages/register/RegisterAsRestaurant'
import RegisterAsPersonalAccount from './pages/register/RegisterAsPersonalAccount'
import RegisterOptions from './pages/register/RegisterOptions'
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        {/* GROUP ROUTES REGISTER */}
        <Route path="/register/" element={<RegisterPage />}>
          <Route path="options" element={<RegisterOptions />} />
          <Route path="restaurant" element={<RegisterAsRestaurant />} />
          <Route path="personal-account" element={<RegisterAsPersonalAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
