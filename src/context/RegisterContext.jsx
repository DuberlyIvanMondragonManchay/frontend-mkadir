import { createContext, useContext, useEffect, useState } from "react";
const RegisterContext = createContext();
export function RegisterProvider({ children }) {
    const [userRegister, setUserRegister] = useState({
        name: "",
        paternal_surname: "",
        maternal_surname: "",
        dni: "",
        picture: "",
    });
    const [restaurantRegister, setRestaurantRegister] = useState(null);
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

  return (
    <RegisterContext.Provider value={{errorsRegister,setUserRegister,userRegister,setRestaurantRegister,restaurantRegister}}>
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