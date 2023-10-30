import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CardRestaurantAdmin(props) {
  const navigateTo = useNavigate()
  return (
    <div onClick={() => navigateTo(`/restaurants/${props.card_id}`)} className="flex items-end mt-6 mb-4 rounded cursor-pointer bg-white shadow-xl p-2">
        <div className='h-full border-2 rounded-full overflow-hidden'>
            <img className="object-cover h-24 w-24" src={props.card_img} alt={`logo ${props.card_title}`} />
        </div>
        <div className="text-sm ml-2">
            <p className="leading-none text-md text-base font-semibold my-1">{props.card_title}</p>
            <p className="">{props.address}</p>
            <p className="color-text-primary font-semibold">10 empleados</p>
            <div className="mt-2 flex items-center ">
                <p className="color-text-primary font-semibold">Menu no publicado</p>
            </div>
        </div>
        <button className="bg-blue-600 text-sm hover:bg-blue-700 text-white py-1 px-5 rounded-md">Cerrar</button>
    </div>

  )
}
