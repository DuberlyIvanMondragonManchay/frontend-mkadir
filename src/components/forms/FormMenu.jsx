import { Formik } from 'formik'
import React,{useEffect, useRef,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputForm } from '../specific/ComponentsForm'
import { toast,Toaster } from 'sonner';
 
import { RiAdminFill } from 'react-icons/ri';
// Icons
import {MdCloudUpload} from 'react-icons/md';
import { uploadFileImage, uploadFileImage2 } from '../functions/ControllerImage';
import SpinerComponent from '../SpinerComponent';
import { useMenuContext } from '../../context/MenuContext';
import { deleteImage2 } from '../../firebase/config';

export default function FormMenu() {
  const {menu_id,restaurant_id} = useParams()
  const {createMenu,getMenu,setIsLoading,isLoading,updateMenu} = useMenuContext()
  const navigateTo = useNavigate()
  const inputFileRef = useRef(null);
  const [fileImg,setFileImg] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const [clicksCount, setClicksCount] = useState(0);
  const [loadingImage,setLoadingImage] = useState(false)//Loading
  const [menu,setMenu] = useState(null)


  const handleDivClick = () => {
    inputFileRef.current.click();
  };

  const handleChangeImage = async (e) => {
    setLoadingImage(true)
    const img = e.target.files[0];
    if(img){
        setImageUrl(URL.createObjectURL(img))
        setFileImg(img)
    }
    setLoadingImage(false)
  };

  useEffect(()=>{
      if(menu_id){
        const loadData = async() => {
            setIsLoading(true);
            const res = await getMenu(restaurant_id,menu_id)
            setMenu(res.data)
            setImageUrl(res.data.img_menu_url)
            setIsLoading(false)
        }
        if(!menu){
            loadData()
        }
      }

  },[menu_id,menu,getMenu,imageUrl])
  if(isLoading && !menu) return <div className='flex justify-center mt-6'><SpinerComponent/></div>
  return (
    <div>
        <h2 className = "text-xl font-bold color-text-primary flex justify-center gap-1"><RiAdminFill />Administrar restaurante/ <span className='text-black'>{menu_id?"Editar":"Crear"} Menú</span></h2>
        {console.log(isLoading)}
        <Formik 
        enableReinitialize ={true}
        initialValues={
            menu_id?
            {menu_name: "null",
            description: menu ? menu.description : "",
            is_published: menu ? menu.is_published : true,
            img_menu_url: menu ? menu.img_menu_url : ""}
            :
            { menu_name:"null",
            description:"",
            is_published:true,
            img_menu_url:""}
        }
        onSubmit={async (values) => {
            let resImg_url = await uploadFileImage2(fileImg, clicksCount, setClicksCount);
            values.img_menu_url = resImg_url;
          
            if (menu_id) {
              console.log(values);
              const res = await updateMenu(restaurant_id, menu_id, values);
              if (menu && menu.img_menu_url) {
                await deleteImage2(menu.img_menu_url); // Delete Firebase image only if menu.img_menu_url is defined
              }
              if (res.data) return navigateTo(`/admin/restaurants/${restaurant_id}/menus/`);
            } else {
              const res = await createMenu(restaurant_id, values);
              if (res.data) return navigateTo(`/admin/restaurants/${restaurant_id}/menus/`);
            }
            window.localStorage.removeItem('image_name');
          }}
          
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>

                    <div className="my-3 flex justify-center">
                        <div style={{  maxHeight:"800px", maxWidth:"400px"}} className="w-50 overflow-y-auto flex justify-center items-center">
                            <img className={`${imageUrl?"block":"hidden"} m-auto object-center object-cover`} src={imageUrl?imageUrl:null} alt={`Imagen`} />
                        </div>
                    </div>
                    <div
                        className="flex flex-col items-center border-2 border-green-500 rounded p-4 cursor-pointer transition duration-300 hover:bg-green-500 hover:text-white"
                        onClick={handleDivClick}
                        >
                        <MdCloudUpload className="text-4xl mb-2" />
                        <label className="text-lg font-bold">{menu_id?"Actualizar":"Subir"} imagen</label>
                        <input
                            onChange={handleChangeImage}
                            type="file"
                            id="input-file"
                            ref={inputFileRef}
                            className="hidden"
                        />
                    </div>

                    {/* Description */}
                    <InputForm
                        name="description"
                        placeholder="Descripcion del menú"
                        onChange={handleChange}
                        value={values.description}
                        required={true}
                    />

                    <div className="my-3">
                        <b>Estado del menú <span className='font-normal text-sm'>(Indica si el menú esta publicado o no.)</span></b>
                        <br />
                        <div className='mt-2 flex items-center'>
                            <input
                            onChange={handleChange}
                            value={values.is_published}
                            checked={values.is_published ? values.is_published : false}
                            id="is_published" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="is_published" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publicado</label>
                        </div>
                    </div>

                    <button
                    disabled={loadingImage}
                    type="submit"
                    className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2"
                    >
                    {loadingImage ? (
                        <span>
                        <SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-blue-500" /> Espere...
                        </span>
                    ) : isSubmitting ? (
                        <span>
                        <SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-blue-500" /> 
                        {menu_id?"Actualizando menú...":"Creando menú..."}
                        </span>
                    ) : (
                        menu_id?"Actualizar menú":"Crear menú"
                    )}
                    </button>

                </form>
            )}

        </Formik>
    <Toaster/>
    </div>
  )
}
