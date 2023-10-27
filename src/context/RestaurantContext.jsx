import { createContext, useContext, useEffect, useState } from "react";
import { getResturantsRequest,getResturantRequest,deleteResturantRequest, createResturantRequest, updateResturantRequest } from "../api/Restaurant.pi";

const RestaurantContext = createContext();
export function RestaurantProvider({ children }) {
    const [restaurants, setRestaurants] = useState(null);
    const [errors,setErrors] = useState([])
    const [messages,setMessages] = useState(null)
    const [search, setSearch] = useState('');

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

  const getRestaurants = async () => {
    try {
        const res = await getResturantsRequest()
        setRestaurants(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
    }

  const deleteRestaurant = async (restaurant_id) => {
    try {
        const res = await deleteResturantRequest(restaurant_id)
        if(res.status === 200) setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurant_id));
        return res
    } catch (error) {
        console.log(error)        
    }
    }
    
  const getRestaurant = async (restaurant_id) => {
    const res = await getResturantRequest(restaurant_id);
    setIsLoading(false)
    return res
  }

  const createRestaurant = async (restaurant) => {
    try {
      const res = await createResturantRequest(restaurant)
      return res.data
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const updateRestaurant = async (restaurant_id,restaurant_data)=>{
    try {
      await updateResturantRequest(restaurant_id,restaurant_data)
    } catch (error) {
      console.log(error)
    }
      
  }

  const filteredRestaurants = (e) => {
    setSearch(e.target.value);
  }

    return (
        <RestaurantContext.Provider value={{search,filteredRestaurants,messages,setMessages,isLoading,errors,getRestaurant,deleteRestaurant,getRestaurants,restaurants,setIsLoading,createRestaurant,updateRestaurant}}>
      {children}
    </RestaurantContext.Provider>
  );
}



export function useRestaurantContext() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurantContext debe usarse dentro de un RestaurantProvider");
  }
  return context;
}