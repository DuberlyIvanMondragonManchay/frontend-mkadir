import { createContext, useContext, useEffect, useState } from "react";
import { getUserRequest, loginRequest, registerRequest } from "../api/auth.api";
import { createResturantsRequest } from "../api/Restaurant.pi";
// import Cookies from 'universal-cookie';

const AuthContext = createContext();
export function AuthProvider({ children }) {
    // const cookies = new Cookies()
    const [user, setUser] = useState(null);
    const [errors,setErrors] = useState([])
    const [isLoading,setIsLoading] = useState(true)


    const registerUserAuth = async ()=> {
      try {
        const userData = await JSON.parse(window.localStorage.getItem('userRegister'))
        const restaurantData = await JSON.parse(window.localStorage.getItem('restaurantRegister'))
        if(userData){
          const res_user = await registerRequest(userData)
          console.log(userData)
          if(restaurantData){
            try {
              const res_restaurant = await createResturantsRequest({...restaurantData,user:res_user.data.id})
              console.log(restaurantData)
              return res_restaurant
            } catch (error) {
              console.log(error)
              setErrors(error.response.data)
            }
          }
          return res_user
        }
      } catch (error) {
        console.log(error)
        setErrors(error.response.data)
      }
    } 

    const loginUserAuth = async (user) => {
      try {
        const res = await loginRequest(user)
        return res
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

  const verifyUser=async ()=> {
    const res = await getUserRequest()
    setUser(res.data)
  }
  useEffect(()=> {
    if(user==null){
      verifyUser()
      setIsLoading(false)
    }
  },[user])

  return (
    <AuthContext.Provider value={{isLoading,registerUserAuth,errors,loginUserAuth,user}}>
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