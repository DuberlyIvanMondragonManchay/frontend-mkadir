import React, { useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import inactive_employees from '../imgs/icons-inactive/inactive_employees.svg'
import inactive_timetable from '../imgs/icons-inactive/inactive_timetable.svg'
import inactive_menu from '../imgs/icons-inactive/inactive_menu.svg'

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Material ui
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
// import logo MKADIR
import logo from '../imgs/logo.svg'
// Import search 
import SearchComponent from './SearchComponent'
// Icon search
import {BsSearch} from 'react-icons/bs'
import { useRestaurantContext } from "../context/RestaurantContext";
import SpinerComponent from "./SpinerComponent";
import Avatar from "./specific/Avatar";
// React icon
import {AiFillHome} from 'react-icons/ai'
import {FaStore} from 'react-icons/fa'
import {BiSolidUser,BiMenu} from 'react-icons/bi'

export default function Navigation() {
  let location = useLocation();
  const [value, setValue] = React.useState(0);
  const navigateTo=useNavigate()
  const {user,isLoading,restaurantData,theme} = useAuth()
  const [visibleSearch,setVisibleSeach] = useState(false)
  const {filteredRestaurants,search} = useRestaurantContext()
  const regex = /^\/restaurants\/\d+.*$/;
  const urlIsCorrect = regex.test(location.pathname) ///restaurnts/1/bla/bla/bla ... is true
  
  return ( 
      <div className={`m-0 top-0 dark:bg-gray-950 bg-slate-100 dark:text-gray-100 z-50 ${location.pathname!=="/"?"py-0":"py-2"}  px-2 fixed w-full mb-80`}>
        {/* Logo and serach container*/}
        <div className="md:hidden flex items-center justify-between">
              <div onClick={()=>navigateTo('/')} className="mr-3 flex items-end"> {/* Contenedor izquierdo */}
                <div className="mb-1 w-8 h-8">
                  <img className="w-full" src={logo} alt="mkadir logo" />
                </div>
                <h1 className={`text-xl font-bold`}>kadir</h1>
              </div>
              {/* Search */}
              {location.pathname=='/'?
              <div className="w-80 gap-1 flex items-center justify-end"> {/* Contenedor derecho */}
              <SearchComponent className={`${visibleSearch ? "visible-search" : "hidden-search"} md:ml-5`} value={search}  onChange={filteredRestaurants} />
                <BsSearch className="" onClick={()=>setVisibleSeach(!visibleSearch)} style={{ fontSize: '30px' }} />
              </div>
            :null}
            {user?
            // Avatar
            <div className="justify-end md:hidden flex ml-3">
              <Avatar logo_url={user.picture} name={user.name}/>
            </div>
            :null}
        </div>


        {isLoading ? <SpinerComponent/> : 
          <nav className="py-4 flex md:justify-between justify-center items-center">
            {/* Logo and serach container*/}
            <div className={`flex items-center justify-between md:justify-start`}>
              <div onClick={()=>navigateTo('/')} className="hidden md:flex items-end"> {/* Contenedor izquierdo */}
                <div className="mb-1 w-8 h-8">
                  <img className="w-full" src={logo} alt="mkadir logo" />
                </div>
                <h1 className={`text-xl font-bold`}>kadi2r</h1>
              </div>
              {/* Search */}
              {location.pathname=='/'?
              <div className="w-80 mx-1 md:flex hidden items-center justify-end"> {/* Contenedor derecho */}
              <SearchComponent className={`${visibleSearch ? "visible-search" : "hidden-search"}`} value={search}  onChange={filteredRestaurants} />
                <BsSearch className="md:hidden block" onClick={()=>setVisibleSeach(!visibleSearch)} style={{ fontSize: '30px' }} />
              </div>
            :null}
            </div>

            {/* Links */}
            {user?
            <div className="flex flex-row items-center justify-center gap-4 text-center">
              {urlIsCorrect && (
                <>
                  <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/work-schedule`} className="col link-item"><img src={inactive_timetable} alt="Timetable Icon" /></Link>
                  <Link to='/restaurants/menu' className="col link-item"><img src={inactive_menu} alt="Menu Icon" /></Link>
                  <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/employees`} className="col link-item"><img src={inactive_employees} alt="Employees Icon" /></Link>
                </>
              )}
              
              <BottomNavigation style={{ background: theme === "dark" ? "#030712" : "#f0f2f5" }} showLabels value={value} onChange={(event, newValue) => { setValue(newValue); }}>
                <BottomNavigationAction onClick={() => navigateTo('/')} label="Home" style={{ color: value === 0 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} icon={<AiFillHome style={{ fontSize: 30, color: value === 0 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} />} />
                <BottomNavigationAction onClick={() => navigateTo('/restaurants')} label="Restaurants" style={{ color: value === 1 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} icon={<FaStore style={{ fontSize: 30, color: value === 1 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} />} />
                <BottomNavigationAction onClick={() => navigateTo('/profile')} label="Profile" style={{ color: value === 2 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} icon={<BiSolidUser style={{ fontSize: 30, color: value === 2 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} />} />
                <BottomNavigationAction onClick={() => navigateTo('/admin')} label="Admin" style={{ color: value === 3 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} icon={<BiMenu style={{ fontSize: 30, color: value === 3 ? '#307A59' : (theme === 'dark' ? "#ffffff" : "#444444") }} />} />
              </BottomNavigation>

            </div>
            :null}

            <div className={`${location.pathname!=="/"?"hidden":"block"}`}></div>
            
            {user?
            // Avatar
            <div className="justify-end md:flex hidden">
              <Avatar logo_url={user.picture} name={user.name}/>
            </div>
            :null}

          </nav>
        }
      </div>

  )
}
  
  