import React, { useEffect } from 'react'

export const ButtonPrimary=(props) =>{
  return (
    <button
    type= {props.type? props.type : "submit"}
    className={`mt-6 ${props.disabled ?"bg-teal-500 color-text cursor-not-allowed" : "bg-color-primary text-white"} w-full py-3  rounded-xl md:rounded-xl`}
    disabled = {props.disabled ? props.disabled : false}
    >
    {props.text?props.text:"Title"}
  </button>
  )
}

export const InputForm =(props)=>{
  return (
    <input 
    id={props.name}
    className="dark:bg-gray-950 dark:text-gray-100 p-4 w-full py-4 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800"
    type={props.type?props.type:"text"} 
    placeholder={props.placeholder}
    name={props.name}
    onChange={props.onChange}
    value={props.value}
    required={props.required}
    maxLength={props.maxLength}
    />
  )
}

export const InputFormPassword =(props)=>{
    return (
      <input 
      id={props.name}
      className="dark:bg-gray-950 dark:text-gray-100 p-4 w-full py-4 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800"
      type="password"
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      required={props.required}
      minLength={5}
      />
    )
}