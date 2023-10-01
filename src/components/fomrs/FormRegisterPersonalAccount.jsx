import {Formik} from 'formik'
import {json, useNavigate} from 'react-router-dom'
import {ButtonPrimary,InputForm} from '../specific/ComponentsForm'
import { useRegister } from '../../context/RegisterContext';
import { useAuth } from '../../context/AuthContext';
export default function FormRegisterPersonalAccount() {
  const navigateTo = useNavigate()
  const {setUserRegister,userRegister} = useRegister()
  const {registerUserAuth} = useAuth()
  return (
    <div className="m-2">
      <h2 className = "text-xl font-bold color-text-primary">Datos de la cuenta</h2>

    <Formik
      initialValues={{
        email: userRegister.email || '',
        password: userRegister.password || '',
        username:userRegister.email || '',
        confirm_password: "",
      }}
      onSubmit={async (values) => {
        setUserRegister({...userRegister,...values});
  
        const userdata = JSON.parse(window.localStorage.getItem('userRegister'))
        window.localStorage.setItem('userRegister',JSON.stringify({...userdata,...values,username:values.email}));        
        registerUserAuth()//register to database

        // navigateTo('/register/personal-account')     
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>

          <div className="my-3">
            <label htmlFor="email">
              <b>Correo electrónico</b>
            </label>
            <InputForm
              name="email"
              placeholder="Escribe tu correo electrónico"
              onChange={handleChange}
              value={values.email}
            />
          </div>

          <div className="my-3">
            <label htmlFor="password">
              <b>Contraseña</b>
            </label>
            <InputForm
              name="password"
              placeholder="Escribe tu contraseña"
              onChange={handleChange}
              value={values.password}
            />
          </div>

          <div className="my-3">
            <label htmlFor="confirm_password">
              <b>Confirmar contraseña</b>
            </label>
            <InputForm
              name="confirm_password"
              placeholder="Confirma tu contraseña"
              onChange={handleChange}
              value={values.confirm_password}
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
  )
}