import React, { useState, useEffect } from 'react';
import { getResturantsRequest } from '../../api/Restaurant.pi';
import SearchComponent from '../../components/SearchComponent';
import { Outlet, useNavigate,useParams } from 'react-router-dom';
export default function RestaurantAdminPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');
    const navigateTo = useNavigate()
    const { id_restaurant } = useParams()
    const showData = async () => {
        const res = await getResturantsRequest();
        setRestaurants(res.data);
        console.log(res.data);
    };

    const searcher = (e) => {
        setSearch(e.target.value);
    };
        // FILTER DATA
    const results = !search ? restaurants : restaurants.filter((dato)=>dato.name.toLowerCase().includes(search.toLowerCase()))

    const handleGetRestaurant=(id_restaurant)=>{
        console.log(id_restaurant)
        return navigateTo(`/admin/restaurants/${id_restaurant}`)
    }

    useEffect(() => {
        showData();
    }, []);

    if (id_restaurant) return <Outlet/>
    return (
        <div className="overflow-x-auto mx-1">
            <h1 className="text-2xl my-5 text-center">Administrar mis Restaurantes</h1>
            <SearchComponent value={search} onChange={searcher} />
            <div className="max-w-full overflow-x-auto">
                <table style={{ width:"900px" }}  className="min-w-full mt-4 bg-white border">
                    <thead>
                        <tr className='bg-green-200 '>
                            <th className="px-4 py-2 border border-white text-gray-600">#</th>
                            <th className="px-4 py-2 border border-white text-gray-600">Logo</th>
                            <th className="px-4 py-2 border border-white text-gray-600">Nombre</th>
                            <th className="px-4 py-2 border border-white text-gray-600">Estado</th>
                            <th className="px-4 py-2 border border-white text-gray-600">Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((restaurant, index) => (
                            <tr onClick={()=>handleGetRestaurant(restaurant.id)} key={index} className="hover:bg-gray-200 text-center cursor-pointer">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <img className="w-10 h-10 rounded-full" src={restaurant.logo_url} alt="" />
                                </td>
                                <td className="border px-4 py-2">{restaurant.name}</td>
                                <td className="border px-4 py-2">{restaurant.is_open ? "Abierto" : "Cerrado"}</td>
                                <td className="border px-4 py-2">{restaurant.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

