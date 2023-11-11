import React,{useState,useEffect} from 'react'
import SearchComponent from '../../components/SearchComponent'
import { getResturantsRequest } from '../../api/Restaurant.pi'
import CardRestaurantAdmin from '../../components/cards/CardRestaurantAdmin'
import NoResults from '../../components/specific/NoResults'

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
    <div className=''>
        <h1 className='text-3xl mb-2 text-center mt-5'>Mis Restaurantes</h1>
        <SearchComponent value={search} onChange={searcher}/>
        <div className='mt-2 grid grid-cols-1 xl:grid-cols-3 mx-4 xl:gap-2'>
          {
          results.map((restaurant, index) =>(
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
        
    </div>
  )
}
