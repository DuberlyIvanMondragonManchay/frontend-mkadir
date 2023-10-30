import React from 'react'
import { useAuth } from '../../context/AuthContext'
export default function ProfilePageIndex() {
  const { user } = useAuth()
  console.log(user)
  return (
    <div className="w-full mx-auto h-full shadow-lg rounded-lg overflow-hidden">
      <h1 className='text-2xl mb-2 text-center'>Mi perfil</h1>
      <div className="bg-gray-300 h-40"></div> {/* Portada gris */}
      {!user.picture? 
      <div className='flex justify-center items-center'>
        <div style={{ width:"100px",height:"100px"  }} className='border-4 rounded-full flex justify-center items-center bg-color-primary w-32 h-32 sm:w-32 sm:h-32 border-white -mt-12 sm:-mt-16 mx-auto"'>
          <p className='text-5xl text-center text-white'>{user.name.charAt()+user.paternal_surname.charAt()}</p>
        </div>      
      </div>
      :
      <img src={user.picture} alt="Profile Picture" className="w-32 h-32 sm:w-32 sm:h-32 rounded-full border-4 border-white -mt-12 sm:-mt-16 mx-auto"/>
      }
      <div className="py-4 px-6 text-center">
        <p className="text-lg font-semibold mb-2">{user.name} {user.paternal_surname} {user.maternal_surname} </p>
      </div>
    </div>

  )
}
