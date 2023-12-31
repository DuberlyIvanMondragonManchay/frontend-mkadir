import { createContext, useContext, useEffect, useState } from "react";
import { getUserRequest, loginRequest, logoutRequest, registerRequest, verifyPasswordRequest } from "../api/auth.api";
import { createResturantsRequest, getResturantRequest } from "../api/Restaurant.pi";
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie'
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [restaurantData, setRestaurantData] = useState(null);
    const [errors,setErrors] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const navigateTo = useNavigate()
    // -----THEME--------
    const [theme, setTheme] = useState(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }

      return "light";
    });

    useEffect(() => {
      if (theme === "dark") {
        document.querySelector("html").classList.add("dark");
        document.getElementById('body_root').classList.remove("bg-slate-100");
        document.getElementById('body_root').classList.add("bg-black");
      } else {
        document.querySelector("html").classList.remove("dark");
        document.getElementById('body_root').classList.remove("bg-black");
        document.getElementById('body_root').classList.add("bg-slate-100");
      }
    }, [theme]);
    
    const handleChangeTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    // -----THEME END--------

    
    const registerUserAuth = async ()=> {
      try {
        const userData = await JSON.parse(window.localStorage.getItem('userRegister'))
        const restaurantData = await JSON.parse(window.localStorage.getItem('restaurantRegister'))
        if(userData){
          const res_user = await registerRequest(userData)
          if(restaurantData){
            try {
              const res_restaurant = await createResturantsRequest({...restaurantData,user:res_user.data.id})
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
        setUser(res.data.user)
        setIsLoading(false)
        return res
      } catch (error) {
        setErrors(error.response.data)
      }
    }
    const registerUser = async (user) => {
      try {
        const res = await registerRequest(user)
        setUser(res.data)
        console.log(res)
        return res
      } catch (error) {
        console.log(error)
        setErrors(error.response.data)
      }
    }

    const getRestaurant = async(restaurant_id) => {
      const res = await getResturantRequest(restaurant_id);
      setRestaurantData(res.data);
      setIsLoading(false)
      return res
    }

    const logout = async () => {
      await logoutRequest();
      Cookies.remove('jwt')
      console.log(Cookies.get())
      return navigateTo('/');
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
  const verifyPassword = async (password) => {
    try {
      const res = await verifyPasswordRequest({"password":password})
      return res
    } catch (error) {
      setErrors(error.response.data)
    }
  }
  useEffect(()=> {
    if(user==null){
      verifyUser()
      setIsLoading(false)
    }
  },[user])

  return (
    <AuthContext.Provider value={{theme,handleChangeTheme,logout,isLoading,registerUserAuth,registerUser,errors,loginUserAuth,user,getRestaurant,restaurantData,verifyPassword}}>
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