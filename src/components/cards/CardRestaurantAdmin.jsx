import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CardRestaurantAdmin(props) {
  const navigateTo = useNavigate()
  return (
    <div onClick={() => navigateTo(`/restaurants/${props.card_id}`)} className="w-full flex items-end mt-2 mb-4 rounded cursor-pointer bg-white dark:bg-gray-950 dark:text-white shadow-xl p-2">        
          <img className="w-16 h-16 object-cover rounded-full border-4 border-white mx-auto" src={props.card_img} alt={`logo ${props.card_title}`} />
        <div className="text-sm ml-2">
            <p className="leading-none text-md text-base font-semibold my-1">{props.card_title}</p>
            <p className="">{props.address}</p>
            {/* <p className="color-text-primary font-semibold">10 empleados</p> */}
            <div className="mt-2 flex items-center ">
                <p className="color-text-primary font-semibold">Menu publicado</p>
            </div>
        </div>
        <button className="bg-blue-600 text-sm hover:bg-blue-700 text-white py-1 px-1 mx-1 rounded-md">Cerrar</button>
    </div>

  )
}
