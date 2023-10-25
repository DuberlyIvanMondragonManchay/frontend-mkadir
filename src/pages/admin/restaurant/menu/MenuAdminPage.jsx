import React, { useEffect, useState } from 'react'
import { useMenuContext } from '../../../../context/MenuContext'
import { useParams } from 'react-router'
import LoadingPage from '../../../LoadingPage'
import RestaurantDoc from '../../../../components/documentation/RestaurantDoc'
import SpinerComponent from '../../../../components/SpinerComponent'
import SearchComponent from '../../../../components/SearchComponent'
import { Link } from 'react-router-dom'
import { FormatDateFunction } from '../../../../components/functions/FormatDateFunction'
export default function MenuAdminPage() {
  const {menus,getMenus,isLoading} = useMenuContext()
  const [search, setSearch] = useState('');
  const {restaurant_id} = useParams()
  console.log(restaurant_id)
  useEffect(()=> {
    getMenus(restaurant_id)
  },[])

  
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  // FILTER DATA
  const results = !search ? menus : menus.filter((dato)=>dato.menu_name.toLowerCase().includes(search.toLowerCase()))

  const handleGetRestaurant=(restaurant_id)=>{
      return navigateTo(`/admin/restaurants/update/${restaurant_id}`)
  }

  return (
    <div className="overflow-x-auto mx-1">
    <h1 className="text-2xl my-5 text-center">Administrar mis Menus</h1>
    {isLoading? <div className='mt-10'><SpinerComponent/></div>: 
    results?
    menus.length > 0 ? 
    <div className="max-w-full text-end overflow-hidden">
        <SearchComponent value={search} onChange={searcher} />
            <div className='flex justify-end'>
                <Link to="/admin/restaurants/create" className='mt-2 py-2 px-4 bg-color-primary text-white rounded mr-2'>+ Nuevo</Link>
            </div>
        <div className='overflow-x-auto '>    
            <table style={{ width:"900px" }}  className="min-w-full mt-4 bg-white border text-center">
                <thead>
                    <tr className='bg-green-200 '>
                        <th className="px-4 py-2 border border-white text-gray-600">#</th>
                        <th className="px-4 py-2 border border-white text-gray-600">Imagen</th>
                        <th className="px-4 py-2 border border-white text-gray-600">Nombre</th>
                        <th className="px-4 py-2 border border-white text-gray-600">Descripción</th>
                        <th className="px-4 py-2 border border-white text-gray-600">Fecha de creación</th>
                        <th className="px-4 py-2 border border-white text-gray-600">Última Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((menu, index) => (
                        <tr onClick={()=>handleGetmenu(menu.id)} key={index} className="hover:bg-gray-200 text-center cursor-pointer">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-1">
                                <div className='flex justify-center items-center'>
                                  <img className="w-16 h-16 object-cover  ring-gray-300 dark:ring-gray-500"  src={menu.img_menu_url} alt="Medium avatar"/>
                                </div>
                            </td>
                            <td className="border px-4 py-2">{menu.menu_name}</td>
                            <td className="border px-4 py-2">{menu.description}</td>
                            <td className="border px-4 py-2">{ FormatDateFunction(menu.created_at)}</td>
                            <td className="border px-4 py-2">{ FormatDateFunction(menu.updated_at)}</td>
                            {/* <td className="border px-4 py-2">{} </td>
                            <td className="border px-4 py-2">{restaurant.address}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>   
        </div>

    </div>
    :<div className='text-center'>
        <RestaurantDoc linkButton="/admin/restaurants/create" title="Registra un restaurante"/>
    </div>:null}
</div>
  )
}
