import React from 'react'
import {Link} from 'react-router-dom'
import { ButtonPrimary } from '../../components/specific/ComponentsForm'
export default function RegisterOptions() {
  return (
    <div className='max-w-md sm:m-auto px-2'>
        <Link to="/auth/register/restaurant"><ButtonPrimary type="button" text="Restaurante"/></Link>     
        <Link to="/auth/register/personal-data"><ButtonPrimary type="button" text="Cuenta personal"/></Link>     
    </div>
  )
}
