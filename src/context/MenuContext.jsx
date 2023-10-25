import { createContext, useContext, useEffect, useState } from "react";
import { getMenusIsPublishedRequest, getMenusRequest } from "../api/Menu.api";

const MenuContext = createContext();
export function MenuProvider({ children }) {
    const [menus, setMenus] = useState(null);
    const [menusPublisheds, setMenusPublisheds] = useState(null);
    const [errors,setErrors] = useState([])
    const [messages,setMessages] = useState(null)

    const [isLoading,setIsLoading] = useState(true)

  // Eliminar errores despues de 5 segundos
  useEffect(() => {
    if (errors.length > 0 || messages !== null) {
      const timer = setTimeout(() => {
        setErrors([]);
        setMessages(null)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors,messages]);

  const getMenus = async (restaurant_id) => {
    try {
        const res = await getMenusRequest(restaurant_id)
        console.log(res)
        setMenus(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
    }

  const deleteMenu = async (menu_id) => {
    try {
        console.log("Delete menu")
    } catch (error) {
        console.log(error)        
    }
    }
    
  const getMenu = async (menu_id) => {
    console.log("get Menu")
    setIsLoading(false)
  }

  const createRestaurant = async (restaurant) => {
    try {
      console.log("Create menu")
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const updateRestaurant = async (restaurant_id,restaurant_data)=>{
    try {
      console.log("Update Menu")
    } catch (error) {
      console.log(error)
    }
    
  }

  const getMenusIsPublished = async (restaurant_id) => {
    try {
      const res = await getMenusIsPublishedRequest(restaurant_id)
      console.log(res)
      setMenusPublisheds(res.data)
      setIsLoading(false)
  } catch (error) {
      console.log(error)
  }
  }

    return (
    <MenuContext.Provider value={{messages,setMessages,isLoading,errors,setIsLoading,getMenus,menus,menusPublisheds,getMenusIsPublished}}>
      {children}
    </MenuContext.Provider>
  );
}



export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext debe usarse dentro de un MenuProvider");
  }
  return context;
}