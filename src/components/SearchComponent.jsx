import React from 'react'

export default function SearchComponent(props) {
  return (
    <input
      type="search"
      className={`${props.className}  dark:bg-gray-950 color-text p-4 w-full py-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800`}
      placeholder="Buscar..."
      onChange={props.onChange}
    />
  )
}
  