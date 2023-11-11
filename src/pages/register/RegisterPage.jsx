import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { ButtonPrimary, InputForm, InputFormPassword } from '../../components/specific/ComponentsForm'
import { Formik } from "formik";
// SONNER
import { Toaster, toast } from 'sonner'
import { isObjectEmpty } from "../../components/functions/ValidateFunctions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [userGoogle,setUserGoogle] = useState({})
  const {registerUser,errors} = useAuth()
  const navigateTo = useNavigate()
  // CLIENT ID
  const clientID = import.meta.env.VITE_APP_CLIENT_ID;

  const onSuccess = (response) => {
    setUserGoogle(response.profileObj);
  };
  const onFailure = (response) => {
    console.log("Something went wrong");
  };

  const onLogout = () => {
    setUserGoogle({})
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  Object.keys(errors).map((key) => (
    errors[key].map((error) => (
      toast.error(error)
    ))
  ))

  return (
    <div className={`${isObjectEmpty(userGoogle)?"border max-w-md":"max-w-xl"} flex flex-col items-center py-2 m-auto px-4`}>
      <h1 className="text-xl dark:text-gray-100 my-2">
        {isObjectEmpty(userGoogle)?
        "Has click para registrar tu cuenta!!":
        `Genial ${userGoogle.givenName.split(' ')[0]}😉 ahora crea una contraseña!!🔒`}
      </h1>
      {isObjectEmpty(userGoogle)?
      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue  with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>
      : //OBJECT userGoogle is not Empty
      <div>
      <Toaster theme="light" position="top-center" />
      <Formik
      initialValues={{  
        picture:'',
        dni:'',
        name:'',
        paternal_surname:"",
        maternal_surname:"",
        email: '',
        username: '',
        password:'', 
        confirm_password: "",
       
      }}
      onSubmit={async (values) => {
        if(values.password === values.confirm_password){
          // SEPARAR APELLIDOS
          console.log(userGoogle)
          const [firstName,lastName,firstSurName, lastSurName] = userGoogle.givenName.split(" ");
          values.picture = userGoogle.imageUrl
          values.email = userGoogle.email
          values.username = userGoogle.email
          values.name = firstName + lastName
          values.maternal_surname = lastSurName
          values.paternal_surname = firstSurName
          const res = await registerUser(values)//register database
          if(res.data) return navigateTo('/profile')
        }else {
          toast.error(`${userGoogle.givenName.split(' ')[0]} las contrseñas deben ser iguales🙄`)
        }
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="my-3">
          <label htmlFor="dni">
            <b>DNI</b>
          </label>
            <InputForm
              name="dni"
              type="text"
              placeholder="Escribe tu dni"
              onChange={handleChange}
              value={values.dni}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="password">
              <b>Contraseña</b>
            </label>
            <InputFormPassword
              name="password"
              type="password"
              placeholder="Escribe tu contraseña"
              onChange={handleChange}
              value={values.password}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="confirm_password">
              <b>Confirmar contraseña</b>
            </label>
            <InputFormPassword
              name="confirm_password"
              type="password"
              placeholder="Confirma tu contraseña"
              onChange={handleChange}
              value={values.confirm_password}
              required={true}
            />
          </div>

          <ButtonPrimary
            disabled={isSubmitting}
            text={isSubmitting ? "Registrando..." : "Registrarse"}
          />
        </form>
      )}
    </Formik>
      </div>
      //end isObjectEmpty(userGoogle)
     } 
    
    </div>
  );
}
