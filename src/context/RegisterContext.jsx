import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest } from "../api/auth.api";
const RegisterContext = createContext();
export function RegisterProvider({ children }) {
    const [userRegister, setUserRegister] = useState({
        name: "",
        paternal_surname: "",
        maternal_surname: "",
        dni: "",
        picture: null,
        email:"",
        password:"",
    });
    const [restaurantRegister, setRestaurantRegister] = useState({
      name:"",
      address:"",
      logo_url: null
    });
    const [errorsRegister,setErrorsRegister] = useState([])

  // Eliminar errores despues de 5 segundos
  useEffect(() => {
    if (errorsRegister.length > 0) {
      const timer = setTimeout(() => {
        setErrorsRegister([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorsRegister]);
  const register= async ()=>{
    try {
      const res = await registerRequest(userRegister)
      console.log(res)
    } catch (error) {
      console.log(error.response.data)
    }
    console.log("Click en register")
    // console.log(restaurantRegister)
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = '¿Estás seguro de que quieres abandonar la página?';
      event.returnValue = confirmationMessage; // Estándar para la mayoría de los navegadores
      return confirmationMessage; // Necesario para algunos navegadores, por ejemplo, Firefox
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <RegisterContext.Provider value={{errorsRegister,setUserRegister,userRegister,setRestaurantRegister,restaurantRegister,register}}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}