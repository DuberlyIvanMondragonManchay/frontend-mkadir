import {Formik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {ButtonPrimary,InputForm} from '../specific/ComponentsForm'
import { useRegister } from '../../context/RegisterContext';
export default function FormRegisterPersonalAccount() {
  const navigateTo = useNavigate()
  const {setUserRegister} = useRegister()
  return (
    <div className="m-2">
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirm_password: "",
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