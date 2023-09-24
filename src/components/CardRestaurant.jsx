import React from 'react'

export default function CardRestaurant(props) {
  return (
    <div className='px-1 flex justify-start border py-2 my-2 shadow-lg rounded-md'>
        <picture style={{ width:"100px", height:"100px" }} className='border overflow-hidden rounded-full flex justify-end items-center' >
            <img src={props.card_img} alt={`Imagen de ${props.title}`} />
        </picture>
        <p className='text-lg font-bold text-gray-600'>{props.card_title}</p>
    </div>
  )
}
