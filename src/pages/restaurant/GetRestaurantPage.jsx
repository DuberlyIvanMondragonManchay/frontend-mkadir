import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
export default function GetRestaurantPage() {
  const { restaurant_id } = useParams();
  const { user,getRestaurant,restaurantData} = useAuth()
  const [isLoading, setIsLoading] = useState(true);

  const getRestaurantData = async () => {
    try {
      const res = await getRestaurant(restaurant_id);
      if(res.data){
          setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="w-full mx-auto h-full shadow-lg rounded-lg overflow-hidden">
        <h1 className='text-2xl my-5 text-center'>Perfil del restaurante</h1>
        <div className="bg-gray-300 h-40"></div>
        <img src={restaurantData.logo_url} alt="Profile Picture" className="w-32 h-32 sm:w-32 sm:h-32 rounded-full border-4 border-white -mt-12 sm:-mt-16 mx-auto"/>
        <div className="py-4 px-6 text-center">
            <p className="text-lg font-semibold mb-2">{restaurantData.name}</p>
            <div className='flex items-center justify-center'>
                  <div className={`w-3 h-3 rounded-full mr-2 ${restaurantData.is_open ? 'bg-green-500' : 'bg-red-500'}`} />
                  <p className='text-lg font-normal color-text-primary'>{restaurantData.is_open? 'Abierto' : 'Cerrado'}</p>
              </div>
            <p> {restaurantData.address}</p>

            <p className='text-start text-xl font-semibold mt-2'>Detalles <span className='text-sm font-normal'>(Solo tu puedes ver esto)</span></p>
            <p className='text-start mt-1'><span className='font-semibold'>Propietario:</span> {user.paternal_surname}  {user.maternal_surname} {user.name}</p>
            <p className='text-start'><span className='font-semibold'>Total de empleados:</span> 10</p>
            <p className='text-start'><span className='font-semibold'>Total de menus:</span> 2</p>
            <p className='text-start'><span className='font-semibold'>Menú publicado:</span> Si</p>
        </div>
  </div>
  );
}
