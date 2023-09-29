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

export const InputForm =(props)=>{
  return (
    <input 
    id={props.name}
    className="color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800"
    type={props.type?props.type:"text"} 
    placeholder={props.placeholder}
    name={props.name}
    onChange={props.onChange}
    />

  )
}