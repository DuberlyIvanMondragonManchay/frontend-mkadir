import React from 'react'
import CardPublication from './CardPublication'
export default function CardRestaurant(props) {
  return (
      <div style={{ maxWidth:"600px"}} className='bg-white card_menu_restaurant py-2 my-2 sm:my-4 block border hover:shadow-xl shadow-lg rounded-md  cursor-pointer'>
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
        <div className='mt-2 flex justify-center items-center'>
          {props.menus.length <=0 ? <h1 className='text-center'>No menus</h1>:
          <CardPublication carouselData={props.menus}/>}
        </div>
      </div>
  );
}
