import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Avatar(props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const {logout} = useAuth()

  return (
    <div className="relative">
      {props.logo_url !== null && props.logo_url.trim() !== '' ? (
        <img
          className="w-10 h-10 object-cover rounded-full ring-gray-300 dark:ring-gray-500 cursor-pointer"
          src={props.logo_url}
          alt="Medium avatar"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />
      ) : (
        <div
          style={{ width: "50px", height: "50px" }}
          className='border-4 rounded-full flex justify-center items-center bg-color-primary cursor-pointer'
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <p className='text-2xl text-white'>{props.name.charAt()}</p>
        </div>
      )}

      {dropdownVisible && (
        <div className="absolute z-10 mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{props.name}</div>
            <div className="font-medium truncate">{props.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Administrar</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Configuración</a>
            </li>
          </ul>
          <div className="py-1">
            <a onClick={()=>logout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar Sesion</a>
          </div>
        </div>
      )}
    </div>
  );
}
