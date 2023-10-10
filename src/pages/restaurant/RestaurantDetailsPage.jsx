import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
export default function RestaurantDetailsPage() {
  const [isActive,setIsActive] = useState(false)
  const { id_restaurant } = useParams();
  return (
    <div className="m-2 mt-4">
      <h1 className="text-3xl my-5 text-center">Menú</h1>
      <p className="color-text text-xl">Nombre del restaurante</p>
      <h2 className="text-2xl color-text-primary font-bold">Especialmente para usted</h2>
      <div className="flex flex-col items-center">
        <div className="inline-flex mt-2 xs:mt-0">
          <Link onClick={()=>setIsActive(!isActive)} to={`/restaurants/${id_restaurant}/details/menu`} className={`${isActive?"bg-gray-300 color-text":"bg-color-primary text-white"} flex items-center justify-center px-4 h-10 text-base font-medium rounded-l`}>
            Menú
          </Link>
          <Link onClick={()=>setIsActive(!isActive)} to={`/restaurants/${id_restaurant}/details/location`} className={`${isActive?"bg-color-primary text-white":"bg-gray-300 color-text"} flex items-center justify-center px-4 h-10 text-base font-medium rounded-r border-0 border-l`}>
            Ubicación
          </Link>
        </div>
      </div>
        <Outlet/>
    </div>
  );
}
