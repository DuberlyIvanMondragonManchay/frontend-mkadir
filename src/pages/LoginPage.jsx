import { Formik } from 'formik'
import { Alert } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { ButtonPrimary,InputForm } from '../components/specific/ComponentsForm'
import { useRegister } from '../context/RegisterContext';
import { useAuth } from '../context/AuthContext';
export default function LoginPage() {
  const navigateTo = useNavigate()
  const {loginUserAuth,errors} = useAuth()
  return (
    <div className="m-2">
      {/* {errors.length <= 0 ? "" : <Alert className="mt-3" severity="error">{errors}</Alert>} */}
      <h1 className="mt-3 color-text-primary font-semibold text-2xl text-center">
            <span className="color-text">¡Hola</span>, te damos la{" "}
            <br className="md:block hidden" /> Bienvenida!
      </h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: 'duberly'
      }}
      onSubmit={async (values) => {
        const res= await loginUserAuth(values)
        console.log(errors)
        console.log(res)
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {/* {Object.keys(errors).map((key, index) => (
            errors[key].map((error, errorIndex) => (
              <div key={errorIndex}>
                <Alert className="mt-3" severity="error">{key}: {error}</Alert>
              </div>
            ))
          ))} */}
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
          <p className='text-center'><Link className='color-text-primary underline'>¡Regístrate</Link> en Mkadir!</p>
          <ButtonPrimary
            disabled={isSubmitting}
            text={isSubmitting ? "Accediendo..." : "Acceder"}
          />
        </form>
      )}
    </Formik>
  </div>
  )
}