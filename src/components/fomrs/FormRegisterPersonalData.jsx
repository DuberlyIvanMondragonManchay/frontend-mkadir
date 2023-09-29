import React from 'react'
import { useNavigate  } from "react-router-dom";
import { Formik } from "formik";
import {ButtonPrimary,InputForm} from '../../components/specific/ComponentsForm'
import { useRegister } from '../../context/RegisterContext';
export default function FormRegisterPersonalData() {
  const {setUserRegister} = useRegister()
  const navigateTo = useNavigate()
  return (
    <div className="m-2">
    <Formik
      initialValues={{
        name: "",
        paternal_surname: "",
        maternal_surname: "",
        dni: "",
        picture: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        setUserRegister(values);
        navigateTo('/register/personal-account')
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
