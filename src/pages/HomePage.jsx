import React, { useEffect, useState, useRef } from 'react';
import CarrouselComponent from '../components/CarrouselComponent';
import CardRestaurant from '../components/cards/CardRestaurant';
import { getPagesResturantsRequest } from '../api/Restaurant.pi';
import { useRestaurantContext } from '../context/RestaurantContext';
import NoResults from '../components/specific/NoResults';
export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(2)
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const elementRef = useRef(null);
  // Restaurant context
  const {search} = useRestaurantContext()

  const getData = async (pageNum) => {
    try {
      const res = await getPagesResturantsRequest(pageNum);
      setRestaurants((data) => [...data, ...res.data.results]);
      
      setPage(pageNum + 1);
      setPagesCount(Math.ceil(res.data.count/2));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(OnIntersection, {
      threshold: 0.1,
    });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (observer) observer.disconnect(); // Disconnect observer
    };
  }, [restaurants]);

  const OnIntersection = async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      if(page<=pagesCount){
        await getData(page);
      }else{
        setHasMore(false)
        console.log("No more results")
      }
    }
  };

  const filteredResults = !search
    ? restaurants
    : restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      );
  return (
  <div className="max-w-xl m-auto ">
      {/* <CarrouselComponent className="sm:hidden"/> */}
      {isLoading ?
      <div style={{ height:"400px" }} className="animate-pulse border shadow rounded-md p-4 max-w-xl w-full mx-auto">
        <div className=" flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="h-72 mt-4 bg-slate-200 rounded"></div>
        </div>
        
       : 
      filteredResults.length > 0 ?

        filteredResults.map((restaurant, index) => (
          <CardRestaurant
            card_id={restaurant.id}
            key={index}
            card_img={restaurant.logo_url}
            card_title={restaurant.name}
            LinkTo={`/restaurants/${restaurant.id}/details/menu`}
            is_open={restaurant.is_open}
            menus={restaurant.menus}
          />
        ))
      :<NoResults/>}

      {/* Ref al último elemento de la lista */}
      <div ref={elementRef}></div>
    </div>
  );
}
