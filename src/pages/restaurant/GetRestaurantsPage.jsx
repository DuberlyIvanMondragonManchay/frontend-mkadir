import React,{useState,useEffect} from 'react'
import SearchComponent from '../../components/SearchComponent'
import { getResturantsRequest } from '../../api/Restaurant.pi'
import CardRestaurantAdmin from '../../components/cards/CardRestaurantAdmin'

export default function GetRestaurantsPage() {
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

  return (
    <div className='m-2 mt-4'>
        <h1 className='text-3xl my-5 text-center'>Mis Restaurantes</h1>
        <SearchComponent value={search} onChange={searcher}/>
        
        {results.map((restaurant, index) =>(
          <CardRestaurantAdmin
          card_id={restaurant.id}
          key={index}
          card_img={restaurant.logo_url}
          card_title={restaurant.name}
          LinkTo={`/restaurants/${restaurant.id}/details/menu`}
          is_open={restaurant.is_open}
          address={restaurant.address}
          />
        ))}
        
    </div>
  )
}
