import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest } from "../api/auth.api";
import { createResturantsRequest } from "../api/Restaurant.pi";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [errors,setErrors] = useState([])

    const registerUserAuth = async ()=>{
      try {
        const userData = await JSON.parse(window.localStorage.getItem('userRegister'))
        const restaurantData = await JSON.parse(window.localStorage.getItem('restaurantRegister'))
        console.log(userData)
        const res_user = await registerRequest(userData)
        const res_restaurant = await createResturantsRequest({...restaurantData,user:res_user.data.id})
        console.log(res_restaurant)
      } catch (error) {
        console.log(error.response.data)
      }
    } 
  // Eliminar errores despues de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider value={{registerUserAuth}}>
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}