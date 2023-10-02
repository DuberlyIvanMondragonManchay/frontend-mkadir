import {Formik} from 'formik'
import { Alert } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import {ButtonPrimary,InputForm} from '../specific/ComponentsForm'
import { useRegister } from '../../context/RegisterContext';
import { useAuth } from '../../context/AuthContext';
export default function FormRegisterPersonalAccount() {
  const navigateTo = useNavigate()
  const {setUserRegister,userRegister} = useRegister()
  const {registerUserAuth,errors} = useAuth()
  return (
    <div className="m-2">
      {/* {errors.length <= 0 ? "" : <Alert className="mt-3" severity="error">{errors}</Alert>} */}
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
        const res = registerUserAuth()//register to database
        if(res){
          navigateTo('/successfully')     
        }else{
          navigateTo('/error')     
        }
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).map((key, index) => (
            errors[key].map((error, errorIndex) => (
              <div key={errorIndex}>
                <Alert className="mt-3" severity="error">{key}: {error}</Alert>
              </div>
            ))
          ))}
          <div className="my-3">
            <label htmlFor="email">
              <b>Correo electrónico</b>
            </label>
            <InputForm
              name="email"
              type="email"
              placeholder="Escribe tu correo electrónico"
              onChange={handleChange}
              value={values.email}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="password">
              <b>Contraseña</b>
            </label>
            <InputForm
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
            <InputForm
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
  )
}