import React,{useEffect,useState} from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import { Formik } from 'formik';
import { InputForm } from '../../../components/specific/ComponentsForm';
import { RiAdminFill } from 'react-icons/ri'
import WarningModal from '../../../components/modals/WarningModal';
import { Alert } from "@mui/material";
import CardAdmin from '../../../components/cards/CardAdmin';
import SpinerComponent from '../../../components/SpinerComponent'
// images
import menu from '../../../imgs/icons/menu.svg'
import employees from '../../../imgs/icons/employees.svg'
import food from '../../../imgs/icons/food.svg'
import schedule from '../../../imgs/icons/schedule.svg'
import { useRestaurantContext } from '../../../context/RestaurantContext';

export default function GetRestaurantAdminPage() {
  const navigateTo = useNavigate()
  const { restaurant_id } = useParams();
  const [imageUrl,setImageUrl] = useState(null)
  const [loading,setLoading] = useState(false)//Loading
  const [ restaurantData,setRestaurantData] = useState(null)
  const [imageError,setImageError] = useState(null)
  const { verifyPassword,errors } = useAuth()
  const {isLoading, setIsLoading,getRestaurant,deleteRestaurant} = useRestaurantContext()
  const getRestaurantData = async () => {
    try {
      const res = await getRestaurant(restaurant_id);
      if(res.data){
        setRestaurantData(res.data);
          setIsLoading(false);
          console.log(restaurantData)
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const handleChangeImage = async (e) => {
    setLoading(true)
    const img = e.target.files[0];
    console.log(img)
  };
  if (isLoading || !restaurantData) return <SpinerComponent/>
  
  // Delete logo
  const deleteLogo = () => {
    console.log("deleteLogo")
  }

  // Verify Password and delete restaurant
  const handleVerifyPassword = async (password,restaurant_id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_restaurant = await deleteRestaurant(restaurant_id)
        if(res_delete_restaurant.data){
          return navigateTo('/admin/restaurants')
        }
      } catch (error) {
        alert("Error al eliminar restaurante")
        return navigateTo(`/admin/restaurants/${restaurant_id}`)
      }
      
    }
  }

  return (
    <div className = "m-2">
    <h2 className = "text-xl font-bold color-text-primary flex justify-center gap-1"><RiAdminFill />Administrar restaurante</h2>
    {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
    <Formik
      initialValues={{
        name: restaurantData.name,
        address: restaurantData.address,
        ruc: restaurantData.ruc || "",
        is_open: restaurantData.is_open || false,
        logo_url: imageUrl || restaurantData.logo_url
      }}
      onSubmit={async (values) => {
        console.log(values) 
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="my-3 flex justify-center">
            
            <label htmlFor="logo_url" style={{ width: "100px", height:"100px" }} className="border flex  rounded-full overflow-hidden bg-gray-400 cursor-pointer">
              <img className="m-auto" src={loading ? loading_picture : imageUrl ? imageUrl:restaurantData.logo_url} alt="imagen-logo" />
            </label>
          </div>

          <div className="my-3 ">
            <div className='color-text-primary font-medium flex justify-center gap-2'>
              <label htmlFor="logo_url" className='cursor-default'>Editar logo</label>
              <div onClick={deleteLogo} className='cursor-default'>Eliminar logo</div>
            </div>
            <input 
            style={{ display: 'none' }}
            type="file"
            id="logo_url"
            onChange={handleChangeImage}/>
          </div>

          <div className="my-3">
            <label htmlFor="name">
              <b>Nombre del restaurante</b>
            </label>
            <InputForm
              name="name"
              placeholder="Escribe el nombre del restaurante"
              onChange={handleChange}
              value={values.name}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="address">
              <b>Dirección del restaurante</b>
            </label>
            <InputForm
              name="address"
              placeholder="Escribe la direccion del restaurante"
              onChange={handleChange}
              value={values.address}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="ruc">
              <b>RUC del restaurante</b>
            </label>
            <InputForm
              name="ruc"
              placeholder="Escribe el RUC del restaurante"
              onChange={handleChange}
              value={values.ruc}
              required={true}
            />
          </div>

          <div className="mb-3">
            <b>Estado del restaurante <span className='font-normal text-sm'>(Indica a los usuarios si el restaurante esta abierto o cerrado)</span></b>
            <br />
            <div className='mt-2 flex items-center'>
              <input
                onChange={handleChange}
                value={values.is_open}
                id="is_open" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="is_open" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Abierto</label>
            </div>
          </div>

          <div className='flex gap-2  justify-center'>
            <button type='button' className='border-2  bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded'>Cancelar</button>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white' >Guardar</button>
          </div>
        </form>
      )}
    </Formik>
    {/* Options */}
    <div className='flex gap-2  justify-center mt-3'>
        <div className="grid grid-cols-2 gap-4">
          <CardAdmin car_img={employees} card_title = "Mis empleados"/>
          <CardAdmin car_img={menu} card_title = "Mi menú"/>
          <CardAdmin car_img={schedule} card_title = "Horario de trabajo"/>
          <CardAdmin car_img={food} card_title = "Mi platos"/>
          
        </div>
    </div>
    {/* Modal delete */}
    <div className='flex justify-center mt-5'>
            <WarningModal 
            titleButtonModal="Eliminar Restaurante"
            navigateToModal={'/admin/restaurants'}
            textHeaderComponent={<p className='py-3 pl-3 font-semibold'><span className='text-red-500'>Eliminar/</span> {restaurantData.name}</p>}
            textModalComponent={
              <div>
              {errors.length <= 0 ? "" : <Alert className='mb-5' severity="error">{errors}</Alert>}
              <p className='mb-2'>Si eliminas el restaurante <span className='font-semibold'>{restaurantData.name}</span>, se eliminarán los empleados, los menús y los platos que tengan relación con este restaurante.</p>
              <p className='font-semibold'>Para continuar escribe la contraseña de la cuenta</p>
              <Formik initialValues={{ password:"" }}
                  onSubmit={async (values) => {
                    handleVerifyPassword(values.password,restaurantData.id)
                  }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <input 
                    type="password"
                    name='password' 
                    onChange={handleChange}
                    value={values.password}
                    className='color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-blue-800' required/>
                    <button type="submit" className="w-full mt-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2">
                          Eliminar
                      </button>
                  </form>
                )}
              </Formik>
            </div>
            }
            />
    </div>
  </div>
  )
}
