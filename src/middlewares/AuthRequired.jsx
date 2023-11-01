import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link,Outlet } from 'react-router-dom'

export default function AuthRequired(props) {
    const {user,isLoading} = useAuth()
        if(isLoading) return <h1>Loading...</h1> 
        if(!user) return <Link className='underline block mt-5 text-lg text-blue-700 text-center' to={"/auth/login"}>AuthRequired</Link> 
        if(props.children) return props.children

    return <Outlet/>
}
