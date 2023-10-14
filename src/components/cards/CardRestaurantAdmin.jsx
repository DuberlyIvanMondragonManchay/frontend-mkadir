import React from 'react'
import { Link } from 'react-router-dom'

export default function CardRestaurantAdmin(props) {
  return (
    <Link to={`/restaurants/${props.card_id}`} className="flex items-end mt-6 mb-4 rounded cursor-pointer">
        <div className='h-full flex m-auto'>
            <img style={{ height:"80px",width:"80px" }} className="rounded-full" src={props.card_img} alt={`logo ${props.card_title}`}/>
        </div>
        <div className="text-sm ml-2">
            <p className="leading-none text-md text-base font-semibold my-1">{props.card_title}</p>
            <p className="">{props.address}</p>
            <p className="color-text-primary font-semibold">10 empleados</p>
            <div className="mt-2 flex items-center ">
                <p className="color-text-primary font-semibold">Menu no publicado</p>
            </div>
        </div>
   
        <button className="bg-blue-600 text-sm hover:bg-blue-700 text-white py-1 px-5 rounded-md ">Cerrar</button>

    </Link>
  )
}
