import React from 'react'
import { Link } from 'react-router-dom'
export default function AlertComponent(props) {
  return (
    <div className="color-text text-center mt-5">
          <h1 className="font-bold text-xl my-3 color-text-primary">{props.title}</h1>
          <div className="flex justify-center  m-4">
            <img
              className="w-60"
              src={props.image}
              alt="Ilustración de éxito de Wortika"
            />
          </div>
          <div className="flex grid-rows-2 justify-evenly mb-4">
            <Link
              to={props.linkBtn1} //url para el button 1
              className="bg-color-primary py-2 px-2 text-white rounded-xl md:rounded-xl"
            >
              {props.button1Text}
            </Link>
          </div>
        </div>
  )
}
