import React from 'react'
import './App.css'
import './styles/Styles.css'
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
                <div id='space_sidebar' className='pt-20 sm:mt-20 mt-4 px-2 md:p-16 md:ml-64 xl:mr-64'>
                  <Routes/>     
                </div>
              <RightSidebar/>
              
            </MenuProvider>
          </RestaurantProvider>
        </RegisterProvider>
      </AuthProvider>
    )
  }
