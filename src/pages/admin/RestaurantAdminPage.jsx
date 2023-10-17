import React, { useState, useEffect } from 'react';
import { getResturantsRequest } from '../../api/Restaurant.pi';
import SearchComponent from '../../components/SearchComponent';
import { AiOutlineClose } from 'react-icons/ai';

export default function RestaurantAdminPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

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
  

    const handleCheckboxChange = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((item) => item !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }

        // Mostrar el div de eliminar si hay más de una fila seleccionada
        setIsDeleteVisible(selectedRows.length >=0);
    };
    const handleDeleteClick = () => {
        // Lógica para manejar la eliminación de los elementos seleccionados

        // Después de eliminar, resetea los checkboxes
        setSelectedRows([]);
        setIsDeleteVisible(false);
    };
    useEffect(() => {
        showData();
    }, []);

    return (
        <div className="overflow-x-auto mx-1">
            <h1 className="text-2xl my-5 text-center">Administrar mis Restaurantes</h1>
            {isDeleteVisible && (
                <div className="my-2 py-2 border bg-gray-100 flex justify-between items-center">
                    <div className="flex justify-between items-center ml-5">
                        <AiOutlineClose onClick={() => {
                                setSelectedRows([]); // Deseleccionar checkboxes
                                setIsDeleteVisible(false);
                            }} />
                        <p className="mx-3">{selectedRows.length} Seleccionados</p>
                    </div>
                    <button className="border border-gray-400 color-text-primary rounded-md px-4 py-2 mr-2"
                    onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </div>
            )}
            <SearchComponent value={search} onChange={searcher} />
            <div className="max-w-full overflow-x-auto">
                <table className="min-w-full mt-4 bg-white border border-gray-300">
                    {/* Resto de tu código */}
                    <tbody>
                        {results.map((restaurant, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                        onChange={() => handleCheckboxChange(index)}
                                        checked={selectedRows.includes(index)}
                                    />
                                </td>
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

