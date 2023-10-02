import React, { useEffect } from 'react'

export const ButtonPrimary=(props) =>{
  // useEffect(()=>{
  // },[props.disabled])
  return (
    <button
    type= {props.type? props.type : "submit"}
    className={`mt-6 ${props.disabled ?"bg-green-200 color-text" : "bg-color-primary text-white"} w-full py-3  rounded-xl md:rounded-xl`}
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
    className="color-text p-4 w-full py-4 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800"
    type={props.type?props.type:"text"} 
    placeholder={props.placeholder}
    name={props.name}
    onChange={props.onChange}
    value={props.value}
    required={props.required}
    />
  )
}