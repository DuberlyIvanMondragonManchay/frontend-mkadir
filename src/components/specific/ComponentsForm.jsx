import React from 'react'

export const ButtonPrimary=(props) =>{
  return (
    <button
    type= {props.type? props.type : "submit"}
    className="mt-6 bg-color-primary w-full py-2 text-white rounded-xl md:rounded-xl"
    disabled = {props.disabled ? props.disabled : false}
    >
    {props.text}
  </button>
  )
}
