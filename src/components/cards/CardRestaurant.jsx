import React, { useEffect, useState } from 'react'
import CardPublication from './CardPublication'
import menu_img from '../../imgs/menu_img.svg'
import SpinerComponent from '../SpinerComponent'
import { getMenusIsPublishedRequest } from '../../api/Menu.api'
export default function CardRestaurant(props) {
  // const {getMenus,menus,isLoading} = useMenuContext()
  const [menus,setMenus] = useState([])
  const [loadingMenu,setLoadingMenu] = useState(true)
  const carouselData=[
    {image:menu_img,caption:"Menu del dia"},
    {image:menu_img,caption:"Menu del dia"},
  ]

  // console.log(props.restaurant_id)
  const getData = async () => {
    const res = await getMenusIsPublishedRequest(props.card_id)
    setMenus(res.data)
    setLoadingMenu(false)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
      <div ref={props.card_ref} className='card_menu_restaurant py-2 my-2 block border hover:shadow-xl shadow-lg rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200 cursor-pointer'>
        <div className='flex items-center '>
          <div className='flex justify-center items-center'>
          {props.card_img !== null && props.card_img.trim() === ''?
              <div style={{ width:"50px",height:"50px"  }} className='ml-2 rounded-full flex justify-center items-center bg-color-primary'>
                  <p className='text-2xl text-white'>{props.card_title.charAt()}</p>
              </div>      
              :
              <img style={{ width:"50px",height:"50px"  }} className="ml-3 w-10 h-10 object-cover rounded-full ring-gray-300 dark:ring-gray-500"  src={props.card_img} alt="Medium avatar"/>
          }
          </div>
            <div className='ml-4 w-full flex justify-between mr-3'>
                <div>
                  <p className='text-lg font-bold text-black-600'>{props.card_title}</p>
                </div>
                
                <div className='flex items-center'>
                    <div className={`w-3 h-3 rounded-full mr-2 ${props.is_open ? 'bg-green-500' : 'bg-red-500'}`} />
                    <p>{props.is_open ? 'Abierto' : 'Cerrado'}</p>
                </div>
          </div>
        </div>
        <div className='mt-2'>
          {loadingMenu? <div className='text-center'><SpinerComponent/></div> : 
          <>
          {menus.length <=0 ? <h1 className='text-center'>No menus</h1>:
          <CardPublication carouselData={menus}/>
          }
          </>
          }
        </div>
      </div>
  );
}
