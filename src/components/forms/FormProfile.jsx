import React, { useState } from 'react'
import {useAuth} from '../../context/AuthContext'
import { Link, useNavigate  } from "react-router-dom";
import { Formik } from "formik";
import {ButtonPrimary,InputForm} from '../specific/ComponentsForm'
import img_loading_profile from '../../imgs/gifs/img_loading_profile.gif'

export default function FormProfile() {
  const {user} = useAuth()
  const [imageUrl,setImageUrl] = useState(null)
  const [loading,setLoading] = useState(false)//Loading
  const [loadingImage,setLoadingImage] = useState(false)//Loading
  const [changeImage,setChangeImage] = useState(false)//Is Change image
  const [fileImg,setFileImg] = useState(null)

  console.log(user)

  const navigateTo = useNavigate()
  // const userPictureDefault = "https://firebasestorage.googleapis.com/v0/b/dimm-d6925.appspot.com/o/mkadir%2Flogo_default_user.svg?alt=media&token=35f3ad13-f04f-4a8d-82c7-a07e820a1124&_gl=1*70o08d*_ga*MTMyODQ5MjUzOC4xNjkzMDA0NjQ1*_ga_CW55HF8NVT*MTY5NjE3NDM1NS4xOS4xLjE2OTYxNzQzOTAuMjUuMC4w"
  
  const handleChangeImage = async (e) => {
    setChangeImage(true) //Yes is change image
    setLoadingImage(true)
    const img = e.target.files[0];
    if(img){
        setImageUrl(URL.createObjectURL(img))
        setFileImg(img)
    }
    setLoadingImage(false)
  };

  return (
    <div className="max-w-md m-auto px-2">
      <h2 className = "text-xl font-bold color-text-primary">Datos personales</h2>

    <Formik
      initialValues={{
        name: user.name,
        paternal_surname: user.paternal_surname,
        maternal_surname: user.maternal_surname,
        dni: user.dni,
        picture: user.picture || null,
      }}
      onSubmit={async (values) => {
        console.log(values)
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className='dark:text-white'>
          <div className="my-3 flex justify-center">
            
            <label htmlFor="logo_url" style={{ width: "100px", height:"100px" }} className="border flex  rounded-full overflow-hidden bg-gray-400 cursor-pointer">
              <img className="m-auto" src={loadingImage ? img_loading_profile : imageUrl } alt="user avatar" />
            </label>
          </div>

          <div className="my-3 ">
            <div className='color-text-primary font-medium flex justify-center gap-2'>
              <label htmlFor="logo_url" className='cursor-default'>Editar logo</label>
              <div  className='cursor-default'>Eliminar logo</div>
            </div>
            <input 
            style={{ display: 'none' }}
            type="file"
            id="logo_url"
            onChange={handleChangeImage}
            />
          </div>

          <div className="my-3">
            <label htmlFor="name">
              <b>Nombres</b>
            </label>
            <InputForm
              name="name"
              placeholder="Escribe tus nombres"
              onChange={handleChange}
              value={values.name}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="paternal_surname">
              <b>Apellido paterno</b>
            </label>
            <InputForm
              name="paternal_surname"
              placeholder="Escribe tus apellidos paternos"
              onChange={handleChange}
              value={values.paternal_surname}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="Maternal_surname">
              <b>Apellido Materno</b>
            </label>
            <InputForm
              name="maternal_surname"
              placeholder="Escribe tus apellidos maternos"
              onChange={handleChange}
              value={values.maternal_surname}
              required={true}
            />
          </div>

          <label htmlFor="dni">
            <b>DNI</b>
          </label>
          <InputForm
            name="dni"
            placeholder="Escribe tu DNI"
            onChange={handleChange}
            value={values.dni}
            required={true}
          />
            <div className='flex gap-2 mt-4 justify-center'>
              <Link to="/admin" className='border-2 text-black bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded'>Cancelar</Link>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white' >Guardar</button>
          </div>
        </form>
      )}
    </Formik>
  </div>
  )
}

