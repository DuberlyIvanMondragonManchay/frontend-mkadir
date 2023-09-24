import React,{useEffect, useState} from 'react'
import CarrouselComponent from '../components/CarrouselComponent'
import SearchComponent from '../components/SearchComponent'
import CardRestaurant from '../components/CardRestaurant'
import { getResturantsRequest } from '../api/Restaurant.pi'
export default function HomePage() {
  const [restaurants,setRestaurants] = useState([])
  const [search,setSearch] = useState('')

  const showData = async()=>{
    const res = await getResturantsRequest()
    setRestaurants(res.data)
  }
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  // FILTER DATA
  const results = !search ? restaurants : restaurants.filter((dato)=>dato.name.toLowerCase().includes(search.toLowerCase()))


  useEffect(()=>{
    showData()
  },[])




  // useEffect(()=>{
  //   async function getRestaurants() {
  //     const res = await getResturantsRequest()
  //     setRestaurants(res.data)
  //   }
  //   if(restaurants.length <=0){
  //     getRestaurants()
  //   }
  // },[restaurants])


  return (
    <div className='m-2 mt-4'>
        <h1 className='text-3xl my-5 text-center'>Restaurantes</h1>
        <CarrouselComponent/>
        <SearchComponent value={search} onChange={searcher}/>
        
        {results.map((restaurant, index) =>(
          <CardRestaurant 
          key={index}
          card_img={restaurant.logo_url}
          card_title={restaurant.name}
          />
        ))}
        
    </div>
  )
}
