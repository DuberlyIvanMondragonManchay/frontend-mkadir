import { createContext, useContext, useEffect, useState } from "react";
import { createMenuRequest, deleteMenuRequest, getMenuRequest, getMenusIsPublishedRequest, getMenusRequest, updateMenuRequest } from "../api/Menu.api";

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
        setMenus(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
    }

  const deleteMenu = async (restaurant_id,menu_id) => {
    try {
       const res = await deleteMenuRequest(restaurant_id,menu_id)
       return res
      } catch (error) {
        console.log(error)        
    }
    }
    
  const getMenu = async (restaurant_id,menu_id) => {
    const res = await getMenuRequest(restaurant_id,menu_id)
    setIsLoading(false)
    return res
  }

  const createMenu = async (restaurant_id,menu) => {
    try {
      return await createMenuRequest(restaurant_id,menu)
     
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const updateMenu = async (restaurant_id,menu_id,menu_data)=>{
    try {
      const res = await updateMenuRequest(restaurant_id,menu_id,menu_data)
      return res
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
    <MenuContext.Provider value={{updateMenu,deleteMenu,getMenu,createMenu,messages,setMessages,isLoading,errors,setIsLoading,getMenus,menus,menusPublisheds,getMenusIsPublished}}>
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