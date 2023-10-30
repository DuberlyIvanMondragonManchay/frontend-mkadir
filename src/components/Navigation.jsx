import React, { useState } from "react";
import { useLocation,useNavigate,useParams  } from 'react-router-dom';
import inactive_home from '../imgs/icons-inactive/inactive_home.svg'
import inactive_employees from '../imgs/icons-inactive/inactive_employees.svg'
import inactive_timetable from '../imgs/icons-inactive/inactive_timetable.svg'
import inactive_menu from '../imgs/icons-inactive/inactive_menu.svg'
import inactive_restaurant from '../imgs/icons-inactive/inactive_restaurant.svg'
import inactive_user from '../imgs/icons-inactive/inactive_user.svg'
import inactive_menu_admin from '../imgs/icons-inactive/inactive_menu_admin.svg'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import logo MKADIR
import logo from '../imgs/logo.svg'
// Import search 
import SearchComponent from './SearchComponent'
// Icon search
import {BsSearch} from 'react-icons/bs'
import { useRestaurantContext } from "../context/RestaurantContext";
import SpinerComponent from "./SpinerComponent";
import Avatar from "./specific/Avatar";

export default function Navigation() {
  let location = useLocation();
  const navigateTo=useNavigate()
  const {user,isLoading,restaurantData} = useAuth()
  const [visibleSearch,setVisibleSeach] = useState(false)
  const {filteredRestaurants,search} = useRestaurantContext()
  const regex = /^\/restaurants\/\d+.*$/;
  const urlIsCorrect = regex.test(location.pathname) ///restaurnts/1/bla/bla/bla ... is true
  
  return ( 
      <div className={`m-0 top-0 bg-white z-50 ${location.pathname!=="/"?"py-0":"py-2"}  px-2 fixed w-full mb-80`}>
        {isLoading ? <SpinerComponent/> : 

          <nav className="py-4 flex md:justify-between justify-center items-center">
            {/* Logo and serach container*/}
            <div className="md:flex hidden items-center justify-between md:justify-start">
              <div onClick={()=>navigateTo('/')} className="flex items-end"> {/* Contenedor izquierdo */}
                <div className="mb-1 w-8 h-8">
                  <img className="w-full" src={logo} alt="mkadir logo" />
                </div>
                <h1 className={`${!visibleSearch ? "block" : "hidden"} md:block text-xl font-bold`}>kadir</h1>
              </div>
              {/* Search */}
              {location.pathname=='/'?
              <div className="w-80 mx-1 flex items-center justify-end"> {/* Contenedor derecho */}
              <SearchComponent className={`${visibleSearch ? "visible-search" : "hidden-search"} md:ml-5`} value={search}  onChange={filteredRestaurants} />
                <BsSearch className="md:hidden block" onClick={()=>setVisibleSeach(!visibleSearch)} style={{ fontSize: '30px' }} />
              </div>
            :null}
            </div>

            {/* Links */}
            {user?
            <div className="flex flex-row items-center justify-center gap-4 text-center">
              <Link to='/' className="col link-item"><img src={inactive_home} alt="Home Icon" /></Link>
              {urlIsCorrect && (
                <>
                  <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/work-schedule`} className="col link-item"><img src={inactive_timetable} alt="Timetable Icon" /></Link>
                  <Link to='/restaurants/menu' className="col link-item"><img src={inactive_menu} alt="Menu Icon" /></Link>
                  <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/employees`} className="col link-item"><img src={inactive_employees} alt="Employees Icon" /></Link>
                </>
              )}
              <Link to='/restaurants' className="col link-item"><img src={inactive_restaurant} alt="Restaurants Icon" /></Link>
              <Link to='/profile' className="col link-item"><img src={inactive_user} alt="Profile Icon" /></Link>
              <Link to='/admin' className="col link-item"><img src={inactive_menu_admin} alt="Admin Icon" /></Link>
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
  
  