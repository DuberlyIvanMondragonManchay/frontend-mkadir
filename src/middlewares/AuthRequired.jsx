import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, useNavigate} from 'react-router-dom'

export default function AuthRequired(props) {
    const {user,isLoading} = useAuth()
    const navigateTo = useNavigate()
    function handleClick(){
        location.reload()
    }
    if(isLoading) return <h1>Loading...</h1> 
    if(!user) return (
        <div className='flex justify-center items-center flex-col'>
            <p className='text-center'>Bienvenido!! has click para continuar</p>
            <button onClick={handleClick} className='glow-on-hover mt-2'>Continuar</button> 
            <button onClick={()=>navigateTo('/auth/login')} className='glow-on-hover mt-2'>login</button> 
        </div>
    )

        if(props.children) return props.children

    return <Outlet/>
}
