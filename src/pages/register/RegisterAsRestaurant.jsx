import React from "react";
import { useNavigate  } from "react-router-dom";
import { Formik } from "formik";
import {
  ButtonPrimary,
  InputForm,
} from "../../components/specific/ComponentsForm";
import { useRegister } from "../../context/RegisterContext";
export default function RegisterAsRestaurant() {
  let navigateTo  = useNavigate();
  const {setRestaurantRegister } = useRegister();
  return (
    <div className="m-2">
      <h2>Datos del restaurante</h2>
      <Formik
        initialValues={{
          name: "",
          address:"",
          logo_url:""
        }}
        onSubmit={async (values) => {
          console.log(values);
          setRestaurantRegister(values)
          navigateTo('/register/personal-data')
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              
              <label htmlFor="logo_url">
                <b>Logo del restaurante</b>
              </label>
              <InputForm
                type="file"
                name="logo_url"
                onChange={handleChange}
                value={values.name}
              />
            </div>

            <div className="my-3">
              <label htmlFor="name">
                <b>Nombre del restaurante</b>
              </label>
              <InputForm
                name="name"
                placeholder="Escribe el nombre del restaurante"
                onChange={handleChange}
                value={values.name}
              />
            </div>

            <div className="my-3">
              <label htmlFor="address">
                <b>Dirección del restaurante</b>
              </label>
              <InputForm
                name="address"
                placeholder="Escribe la direccion del restaurante"
                onChange={handleChange}
                value={values.address}
              />
            </div>
            <ButtonPrimary
              disabled={isSubmitting}
              text={isSubmitting ? "Siguiente..." : "Siguiente"}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
