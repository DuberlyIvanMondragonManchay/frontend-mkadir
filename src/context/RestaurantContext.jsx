import { createContext, useContext, useEffect, useState } from "react";
import { getResturantsRequest,getResturantRequest,deleteResturantRequest, createResturantRequest } from "../api/Restaurant.pi";

const RestaurantContext = createContext();
export function RestaurantProvider({ children }) {
    const [restaurants, setRestaurants] = useState(null);
    const [errors,setErrors] = useState([])
    const [isLoading,setIsLoading] = useState(true)

  // Eliminar errores despues de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

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
    return (
        <RestaurantContext.Provider value={{isLoading,errors,getRestaurant,deleteRestaurant,getRestaurants,restaurants,setIsLoading,createRestaurant}}>
      {children}
    </RestaurantContext.Provider>
  );
}



export function useRestaurantContext() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant debe usarse dentro de un AuthProvider");
  }
  return context;
}