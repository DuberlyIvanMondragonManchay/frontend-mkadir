import React from 'react'
import plate from '../../imgs/plate.svg'
export default function CardFood(props) {
  return (
    <div className="col mx-auto mb-1">
        <div className="bg-white rounded-lg shadow-md p-2 m-1 flex flex-col text-center" style={{ width:"130px",height:"200px" }}>
            <img src={props.url_image} alt="Imagen del plato" className="object-cover mb-2"  style={{ height:"100px", maxWidth:"200px"}}/>
            <p className="text-sm font-semibold mb-2">{props.title}</p>
            <p className="text-md font-semibold mb-2 color-text" style={{ textShadow: '0 2px 2px rgba(16, 185, 129, 0.7)' }}>S/. {props.price}</p>

            <p className="text-gray-600">{props.description}</p>
        </div>
    </div>

  )
}
