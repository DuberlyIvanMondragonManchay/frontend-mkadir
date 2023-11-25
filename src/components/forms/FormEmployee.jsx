import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEmployeeContext } from '../../context/EmployeeContext'
import { InputForm } from '../specific/ComponentsForm'
import { Alert } from '@mui/material'
import WarningModal from '../modals/WarningModal'

// Iconos
import { useAuth } from '../../context/AuthContext'

// Spiner
import SpinerComponent from '../../components/SpinerComponent'

//Image logo Controller
import { uploadFileImage } from '../functions/ControllerImage'
import { Formik } from 'formik'
import { deleteImage2 } from '../../firebase/config'
import { getUserCodeRequest } from '../../api/auth.api'
import { Toaster,toast } from 'sonner'
import { getRolesRequest } from '../../api/Restaurant.pi'

export default function FormEmployee() {
    const [loadingImage,setLoadingImage] = useState(false)//Loading
    const { messages,setMessages,getEmployee, isLoading, setIsLoading,deleteEmployee, createEmployee, updateEmployee } = useEmployeeContext();
    const { verifyPassword,errors } = useAuth()
    const navigateTo = useNavigate()
    const {restaurant_id, employee_id } = useParams()
    const [employee, setEmployee] = useState(null)
    const [imageUrl,setImageUrl] = useState(null)
    const [imageError,setImageError] = useState(null)
    const [clicksCount, setClicksCount] = useState(0)
    // --------- GET USER CODE----------
    const [isLoadingGetUserCode,setIsLoadingGetUserCode] = useState(false)
    const [UserCode,setGetUserCode] = useState(null)
    // ----------ROLES DATA--------------
    const [roles,setRoles] = useState(null)

    const loadRoles = async () =>{
        const rolesData = await getRolesRequest();
        if(rolesData.data){
            setRoles(rolesData.data)
        }

    }
    useEffect(() => {
        setIsLoading(true);

        if (employee_id && !employee) {
            const loadEmployee = async () => {
                try {
                    const employeeData = await getEmployee(employee_id);
                    if (employeeData.data) {
                        setImageUrl(employeeData.data.logo_url)
                        setEmployee(employeeData.data);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error al cargar el empleado:", error);
                }
            };
            loadEmployee();
        } else {
            setIsLoading(false);
        }
        loadRoles();
        setIsLoading(false);
    }, [employee_id, employee, getEmployee]);

      // Verify Password and delete employee
  const handleVerifyPassword = async (password,id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_employee = await deleteEmployee(restaurant_id,employee_id)
        if(res_delete_employee.data){
          return navigateTo(`/admin/restaurants/${restaurant_id}/employees`)

        }
      } catch (error) {
        alert("Error al eliminar employee :c",error.data)
        return navigateTo(`/admin/restaurants/${restaurant_id}/employees/update/${employee_id}`)
      }
      
    }
  }

  const handleGetUserCode= async (user_code)=>{
    setIsLoadingGetUserCode(true)
    console.log(user_code)
    try {
        const res = await getUserCodeRequest(user_code)
        console.log("Usuario encontrado")
        console.log(res.data)
        setGetUserCode(res.data)
    } catch (error) {
        toast("Usuario no encontrado")
    }
    setIsLoadingGetUserCode(false)
  }
  if (isLoading && !employee) return <SpinerComponent/>
    return (
        <div className="m-2 mt-16 p-10">
            <Toaster position="top-center" />
            <h2 className="text-xl font-bold color-text-primary flex justify-center gap-1"> Administrar empleado/ <span className="text-black">{employee_id ? "Editar" : "Crear"}</span></h2>
            {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
      
            {messages === null ? "" : <Alert className="mt-3" severity={messages.color}>{messages.text}</Alert>}

            <Formik
                enableReinitialize={true}
                initialValues={
                    employee?
                        {
                            user: employee.user ? employee.user.user_code : "", 
                            role: employee.user && employee.role ? employee.role.id : "", 
                            dni: employee.dni || "",
                            address: employee.address || "",
                            age: employee.age || "",
                            phone: employee.phone || "",
                        }
                        :
                        {
                            user: employee? employee.user.user_code:"",
                            role: employee? employee.role.id : "",
                            dni: employee? employee.dni:"",
                            address: employee? employee.address:"",
                            age: employee? employee.age:"",
                            phone: employee? employee.phone:"",
                        }
                        }
                onSubmit={async (values) => {
                    if (employee_id ) {
                        console.log("Updated..")
                        console.log(values)
                        try {
                            updateEmployee(restaurant_id, employee_id,values);
                            setMessages({ text: "Datos actualizados correctamente", color: "success" })
                        } catch (error) {
                            setMessages({ text: "Error al actualizar los datos", color: "error" })
                        }
                    } else {
                        if(UserCode !== null){
                            values.user = UserCode.id
                            values.role = parseInt(values.role)
                            console.log(values)
                            console.log(values.user)
                            
                            const data = await createEmployee(restaurant_id,values )
                            
                            if (data && data.id) {
                                navigateTo(`/admin/restaurants/${restaurant_id}/employees`)
                            } else {
                                console.error("Error al crear el empleado:")
                                toast("Ups ocurrio un error")
                            }
                        }else{
                            toast("El usuario es requerido")
                        }
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>

                        {/* USER CODE INFO */}
                        {UserCode?
                            <div>
                            {UserCode.picture?
                            <img src={UserCode.picture} alt={`avatar user ${UserCode.name}`} />
                            :null}
                            <p>{UserCode.name}</p>
                            <p>{UserCode.email}</p>
                        </div>:null}


                        <div className="my-3 flex justify-center flex-row items-center bg-red-300">
                           <label htmlFor="user">
                              <b>Usuario </b>
                           </label>
                           <input 
                           
                           type="text"
                           name="user"
                           placeholder="Ingrese el id del usuario a emplear"
                           onChange={handleChange}
                           value={values.user}
                           required
                           maxLength={5}
                           />
                             <button disabled={isLoadingGetUserCode} type='button' onClick={()=>handleGetUserCode(values.user)} className='border bg-blue-500 px-2 rounded-md'>{ isLoadingGetUserCode? "Buscando...":"Buscar"}</button>
                        </div>
                        
                        <div className="my-3 flex justify-center">
                            <label htmlFor='role'><b>Rol</b></label>
                            <select required onChange={handleChange} value={values.role} id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {roles?roles.map((role, index) => (
                                    <option key={index} value={role.id}>{role.name}</option>

                                )):null}
                            </select>
                       </div>

                        <div className="my-3 flex justify-center">
                            <label htmlFor="address">
                                <b>Direccion del empleado</b>
                            </label>
                            <InputForm
                                name="address"
                                placeholder="Escribe la dirección del empleado"
                                onChange={handleChange}
                                value={values.address}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="age">
                                <b>Edad del empleado</b>
                            </label>
                            <InputForm
                                name="age"
                                placeholder="Escribe la edad del empleado"
                                onChange={handleChange}
                                value={values.age}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="phone">
                                <b>Numero del empleado</b>
                            </label>
                            <InputForm
                                name="phone"
                                placeholder="Escribe el telefono del empleado"
                                onChange={handleChange}
                                value={values.phone}
                                required={true}
                            />
                        </div>
                        <div className="flex gap-2 justify-center">
                            {employee_id ? 
                                <button onClick={() => navigateTo(`/admin/restaurants/${restaurant_id}/employees`)} type="button" className="border-2 bg-gray-100 hover-bg-gray-200 px-3 py-2 rounded">Cancelar</button>
                             : null}
                            <button disabled={loadingImage||isSubmitting} type="submit" className={`${loadingImage? 'cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'} px-3 py-2 rounded text-white`} >

                                {employee_id ? isSubmitting ? 
                                <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Actualizando...</p>
                                    :"Actualizar":

                                     isSubmitting? loadingImage?
                                     <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Creando...</p>
                                     :null:"Crear Empleado"}      
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
          {/* Modal delete */}
    {employee_id ? 
        <div className="flex justify-center mt-5">
            <WarningModal
                titleButtonModal="Eliminar Empleado"
                navigateToModal={`/admin/restaurants/${restaurant_id}/employees`}
                textHeaderComponent={<p className="py-3 pl-3 font-semibold"><span className="text-red-500">Eliminar/</span> {employee ? employee.user : null}</p> }
                textModalComponent={
                    <div>
                        {errors.length <= 0 ? '' : <Alert className="mb-5" severity="error">{errors}</Alert>}
                        <p className="mb-2">Si eliminas al empleado <span className="font-semibold">{employee ? employee.user : null}</span>, se eliminará.</p>
                        <p className="font-semibold">Para continuar, escribe la contraseña de la cuenta.</p>
                        <Formik initialValues={{ password: '' }} 
                        onSubmit={async (values) => {
                            handleVerifyPassword(values.password, employee.id)}}>
                            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password}
                                        className="color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-blue-800" required />
                                    <button type="submit" className="w-full mt-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2">
                                        Eliminar
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                }
            />
        </div>: null}
    </div>
    )
}