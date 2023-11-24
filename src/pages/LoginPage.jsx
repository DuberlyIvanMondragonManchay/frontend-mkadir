import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { ButtonPrimary,InputForm } from '../components/specific/ComponentsForm'
import SpinerComponent from '../components/SpinerComponent'
import { useAuth } from '../context/AuthContext';
import { Toaster,toast } from 'sonner';

export default function LoginPage() {
  const {loginUserAuth,errors,theme} = useAuth()
  const navigateTo = useNavigate()
  if(errors.length > 0){
    toast.error(errors)
  }
  return (
    <div className="max-w-md m-auto px-2 dark:text-white">
      <h1 className="mt-3 color-text-primary font-semibold text-2xl text-center">
            <span className="color-text">¡Hola</span>, te damos la{" "}
            <br className="md:block hidden" /> Bienvenida!
      </h1>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values) => {
        const res= await loginUserAuth(values)
        if(res.data)return navigateTo('/profile') 
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Toaster theme={`${theme=="dark"?"light":"dark"}`} position="top-center" />

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
          <p className='text-center'><Link to={"/auth/register"} className='color-text-primary underline font-semibold'>¡Regístrate</Link> en <b>Mkadir</b>!</p>
          <ButtonPrimary
            disabled={isSubmitting}
            text={isSubmitting ? <div><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/> Accediendo...</div> : "Acceder"}
          />
        </form>
      )}
    </Formik>
    {/* <LoginWithGoogle/> */}
  </div>
  
  )
}