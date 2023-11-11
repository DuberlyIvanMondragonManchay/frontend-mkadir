import React from 'react'
import { FiSun } from 'react-icons/fi'
import {MdDarkMode} from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
export default function ButtonDarkMode() {
  const {handleChangeTheme,theme} = useAuth()
  return (
    <button onClick={handleChangeTheme} className='dark:border-gray-50 border border-gray-950 dark:bg-gray-950 text-gray-950 dark:text-gray-100 p-2 rounded-md'>{theme=="dark"?<FiSun/>:<MdDarkMode/>}</button>
  )
}
