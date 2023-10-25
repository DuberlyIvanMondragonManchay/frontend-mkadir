import React, { useEffect, useState, useRef } from 'react';
import CarrouselComponent from '../components/CarrouselComponent';
import SearchComponent from '../components/SearchComponent';
import CardRestaurant from '../components/cards/CardRestaurant';
import { getPagesResturantsRequest } from '../api/Restaurant.pi';
import SpinerComponent from '../components/SpinerComponent';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(2)
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const elementRef = useRef(null);

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredResults = !search
    ? restaurants
    : restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="m-2 mt-4">
      <h1 className="text-3xl my-5 text-center">Restaurantes</h1>
      <CarrouselComponent />
      <SearchComponent value={search} onChange={handleSearchChange} />
      {isLoading ? <SpinerComponent /> : 
        filteredResults.map((restaurant, index) => (
          <CardRestaurant
            card_id={restaurant.id}
            key={index}
            card_img={restaurant.logo_url}
            card_title={restaurant.name}
            LinkTo={`/restaurants/${restaurant.id}/details/menu`}
            is_open={restaurant.is_open}
          />
        ))
      }
  
      {/* Ref al último elemento de la lista */}
      <div ref={elementRef}></div>
    </div>
  );
}
