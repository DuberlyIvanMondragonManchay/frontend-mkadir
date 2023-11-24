import React from 'react'
import './App.css'
import './styles/Styles.css'
import { AuthProvider } from './context/AuthContext'
import { RegisterProvider } from './context/RegisterContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'
import { EmployeeProvider } from './context/EmployeeContext'

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
            <EmployeeProvider>
              <Navigation/>
              <SidebarComonent/>
                <div id='space_sidebar' className='pt-10 sm:mt-7 mt-4 px-2 md:p-16 md:ml-64 xl:mr-64'>
                  <Routes/>     
                </div>
              <RightSidebar/>
              </EmployeeProvider> 
            </MenuProvider>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
