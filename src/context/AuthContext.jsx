import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth.api";
import { createResturantsRequest } from "../api/Restaurant.pi";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [errors,setErrors] = useState([])

    const registerUserAuth = async ()=> {
      try {
        const userData = await JSON.parse(window.localStorage.getItem('userRegister'))
        const restaurantData = await JSON.parse(window.localStorage.getItem('restaurantRegister'))
        if(userData){
          const res_user = await registerRequest(userData)
          if(restaurantData){
            const res_restaurant = await createResturantsRequest({...restaurantData,user:res_user.data.id})
            // delete data from local Storage
            window.localStorage.removeItem('restaurantRegister')
            window.localStorage.removeItem('image_name')
            window.localStorage.removeItem('userRegister')
            return res_restaurant.data
          }
          // delete data from local Storage
          window.localStorage.removeItem('userRegister')
          return res_user.data
        }
      } catch (error) {
        setErrors(error.response.data)
      }
    } 

    const loginUserAuth = async (user) => {
      try {
        const res = await loginRequest(user)
        return res.data
      } catch (error) {
        setErrors(error.response.data)
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
    <AuthContext.Provider value={{registerUserAuth,errors,loginUserAuth}}>
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