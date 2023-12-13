import React from 'react'
import { useNavigate  } from "react-router-dom";
import { Formik } from "formik";
import {ButtonPrimary,InputForm} from '../specific/ComponentsForm'
import { useRegister } from '../../context/RegisterContext';
export default function FormRegisterPersonalData() {
  const {setUserRegister,userRegister} = useRegister()
  const navigateTo = useNavigate()
  // const userPictureDefault = "https://firebasestorage.googleapis.com/v0/b/dimm-d6925.appspot.com/o/mkadir%2Flogo_default_user.svg?alt=media&token=35f3ad13-f04f-4a8d-82c7-a07e820a1124&_gl=1*70o08d*_ga*MTMyODQ5MjUzOC4xNjkzMDA0NjQ1*_ga_CW55HF8NVT*MTY5NjE3NDM1NS4xOS4xLjE2OTYxNzQzOTAuMjUuMC4w"
  return (
    <div className="max-w-md m-auto px-2">
      <h2 className = "text-xl font-bold color-text-primary">Datos personales</h2>

    <Formik
      initialValues={{
        name: userRegister.name,
        paternal_surname: userRegister.paternal_surname,
        maternal_surname: userRegister.maternal_surname,
        dni: userRegister.dni,
        picture: userRegister.picture || null,
      }}
      onSubmit={async (values) => {
        setUserRegister(values);
        window.localStorage.setItem('userRegister',JSON.stringify(values));
        navigateTo('/auth/register/personal-account')
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>

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
          <ButtonPrimary
            disabled={isSubmitting}
            text={isSubmitting ? "Siguiente..." : "Siguiente"}
          />
        </form>
      )}
    </Formik>
  </div>
  )
}
