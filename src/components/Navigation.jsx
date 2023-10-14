import React from "react";
import { useLocation,useParams  } from 'react-router-dom';
import inactive_home from '../imgs/icons-inactive/inactive_home.svg'
import inactive_employees from '../imgs/icons-inactive/inactive_employees.svg'
import inactive_timetable from '../imgs/icons-inactive/inactive_timetable.svg'
import inactive_menu from '../imgs/icons-inactive/inactive_menu.svg'
import inactive_restaurant from '../imgs/icons-inactive/inactive_restaurant.svg'
import inactive_user from '../imgs/icons-inactive/inactive_user.svg'
import inactive_menu_admin from '../imgs/icons-inactive/inactive_menu_admin.svg'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navigation() {
  let location = useLocation();
  const {user,isLoading,restaurantData} = useAuth()
  console.log(useParams())
  const regex = /^\/restaurants\/\d+.*$/;
  const urlIsCorrect = regex.test(location.pathname) ///restaurnts/1/bla/bla/bla ... is true
    return (
      <nav className="bg-white border py-2 flex justify-center fixed bottom-0 w-full">
        <div className="flex flex-row items-center justify-center gap-4 text-center">
          <Link to='/' className="col link-item"><img src={inactive_home} alt="Home Icon" /></Link>
          {isLoading?<h1>Loading</h1>:user?
          <>
          {urlIsCorrect?
          <>
           <Link to={`/restaurants/${restaurantData?restaurantData.id:null}/work-schedule`} className="col link-item"><img src={inactive_timetable} alt="Timetable Icon" /></Link> 
           <Link to='/restaurants/menu' className="col link-item"><img src={inactive_menu} alt="Menu Icon" /></Link> 
           <Link to={`/restaurants/${restaurantData?restaurantData.id:null}/employees`} className="col link-item"><img src={inactive_employees} alt="Employees Icon" /></Link> 
          </>
        :null}
          <Link to='/restaurants' className="col link-item"><img src={inactive_restaurant} alt="Restaurants Icon" /></Link>
          <Link to='/profile' className="col link-item"><img src={inactive_user} alt="Profile Icon" /></Link>
          <Link to='/admin' className="col link-item"><img src={inactive_menu_admin} alt="Admin Icon" /></Link>
          </>:null
        }
        </div>
      </nav>
    );
  }
  
  