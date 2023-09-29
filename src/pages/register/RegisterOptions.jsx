import React from 'react'
import {Link} from 'react-router-dom'
import { ButtonPrimary } from '../../components/specific/ComponentsForm'
export default function RegisterOptions() {
  return (
    <div>
        <Link to="/register/restaurant"><ButtonPrimary type="button" text="Restaurante"/></Link>     
        <Link to="/register/personal-data"><ButtonPrimary type="button" text="Cuenta personal"/></Link>     
    </div>
  )
}
