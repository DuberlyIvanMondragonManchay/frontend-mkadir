import React from 'react'
import {Link} from 'react-router-dom'
export default function CardRestaurant(props) {
  return (
    <Link to={props.LinkTo} className='px-1 flex justify-start border py-2 my-2 hover:shadow-xl shadow-lg rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100 duration-200 cursor-pointer'>
        <picture style={{ width:"100px", height:"100px" }} className='border overflow-hidden rounded-full flex justify-end items-center' >
            <img src={props.card_img} alt={`Imagen de ${props.title}`} />
        </picture>
        <p className='text-lg font-bold text-gray-600'>{props.card_title}</p>
    </Link>
  )
}
