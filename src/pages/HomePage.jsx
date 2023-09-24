import React,{useEffect, useState} from 'react'
import CarrouselComponent from '../components/CarrouselComponent'
import SearchComponent from '../components/SearchComponent'
import CardRestaurant from '../components/CardRestaurant'
import { getResturantsRequest } from '../api/Restaurant.pi'
export default function HomePage() {
  const [restaurants,setRestaurants] = useState([])
  const [search,setSearch] = useState(null)

  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  useEffect(()=>{
    async function getRestaurants() {
      const res = await getResturantsRequest()
      setRestaurants(res.data)
    }
    if(restaurants.length <=0){
      getRestaurants()
    }
  },[restaurants])

  useEffect(()=>{
    console.log(restaurants)
  },[restaurants])
  return (
    <div className='m-2 mt-4'>
        <h1 className='text-3xl my-5 text-center'>Restaurantes</h1>
        <CarrouselComponent/>
        <SearchComponent value={search} onChange={searcher}/>
        
        {restaurants.map((restaurants, index) =>(
          <CardRestaurant 
          key={index}
          card_img={restaurants.logo_url}
          card_title={restaurants.name}
          />
        ))}
        
    </div>
  )
}
