import React from "react";
import inactive_home from '../imgs/icons-inactive/inactive_home.svg'
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
      <nav className="bg-white border py-2 flex justify-center fixed bottom-0 w-full">
        <div className="flex flex-row items-center justify-center gap-4 text-center">
          <Link to='/' className="col link-item"><img src={inactive_home} alt="Home Icon" /></Link>
        </div>
      </nav>
    );
  }
  
  