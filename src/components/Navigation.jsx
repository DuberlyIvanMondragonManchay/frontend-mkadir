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
export default function Navigation() {
  let location = useLocation();
  const navigateTo=useNavigate()
  const {user,isLoading,restaurantData} = useAuth()
  const [visibleSearch,setVisibleSeach] = useState(false)
  const {filteredRestaurants,search} = useRestaurantContext()
  const regex = /^\/restaurants\/\d+.*$/;
  const urlIsCorrect = regex.test(location.pathname) ///restaurnts/1/bla/bla/bla ... is true
    return (
      <div className="m-0 top-0 bg-white z-10 py-2 px-2 fixed w-full mb-80">
        {/* Navb part1 */}
        <div className={`${location.pathname!=="/"?"hidden":"block"} flex items-center justify-between`}>
          <div onClick={()=>navigateTo('/')} className="flex items-center"> {/* Contenedor izquierdo */}
            <div className="w-5">
              <img className="w-full" src={logo} alt="mkadir logo" />
            </div>
            <h1 className={`${!visibleSearch ? "block" : "hidden"} text-xl font-bold ml-2`}>mkadir</h1>
          </div>
          {location.pathname=='/'?
            <div className="w-80 mx-1 flex items-center justify-end gap-2"> {/* Contenedor derecho */}
            <SearchComponent className={visibleSearch ? "visible-search" : "hidden-search"} value={search}  onChange={filteredRestaurants} />
              <BsSearch onClick={()=>setVisibleSeach(!visibleSearch)} style={{ fontSize: '30px' }} />
            </div>
          :null}

        </div>

        {/* Navbar */}
        {isLoading ? (
          <SpinerComponent/>
        ) : (
          user && (
            <nav>
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
            </nav>
          )
        )}

      </div>

    );
  }
  
  