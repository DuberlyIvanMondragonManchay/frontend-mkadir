import React from 'react'
import AlertComponent from './ui/AlertComponent'
import gif_homero_success from '../imgs/gifs/homero_success.gif'
export const Successfully_1 = () =>{
  return (
    <AlertComponent 
    title="!Cuenta registrada correctamente!"
    text = {<p>Regístrese para empezar.</p>}
    image = {gif_homero_success}
    button1Text = "Ver perfil"
    linkBtn1 = "/profile" 
    />  
  )
}
