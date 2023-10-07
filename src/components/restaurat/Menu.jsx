import React , {useState,useEffect} from 'react'
import SearchComponent from '../SearchComponent'
import { getMenuIsPublishedRequest } from '../../api/Restaurant.pi'
import { useParams } from "react-router-dom";
import CardFood from '../cards/CardFood';

export default function Menu() {
  const [menu,setMenu]  = useState([])
  const [groupPlates,setGroupPlates] = useState([])
  const [search,setSearch] = useState('')
  const [error,setError] = useState(false)

  const { id } = useParams();

  const groupPlatesFunction = (plates) => {
    const updatedGroupPlates = new Set(groupPlates);

    plates.forEach((plate) => {
      const category = plate.category.name;
      const existingCategoryIndex = Array.from(updatedGroupPlates).findIndex((group) => group.category === category);

      if (existingCategoryIndex === -1) {
        updatedGroupPlates.add({ category: category, plates: [plate] });
      } else {
        const existingCategory = Array.from(updatedGroupPlates)[existingCategoryIndex];
        existingCategory.plates.push(plate);
        updatedGroupPlates.delete(existingCategory);
        updatedGroupPlates.add(existingCategory);
      }
    });
    // Reverse the order of the list so it looks like this:
    // 1 = Entradas
    // 2 = Menu
    // 3 = Carta
    setGroupPlates(Array.from(updatedGroupPlates).reverse());
  };

  const showData = async () => {
    try {
      const res = await getMenuIsPublishedRequest(id);
      groupPlatesFunction(res.data.plates);
      setMenu(res.data);
    } catch (error) {
      setError(true);
    }
  };
  
  const searcher = (e) => {
    setSearch(e.target.value)
  }

  //FILTER DATA
  useEffect(()=>{
    showData()
  },[])

  return (
    <div>
      <SearchComponent value={search} onChange={searcher} />
      {error? <p>Menu no Publicado</p> : menu.length <= 0 ? <p>Cargando...</p> :
        menu.plates.length<=0? <p>No hay platos por ahora...</p> :
        groupPlates.map((group_plate, index) => {
          const filteredPlates = group_plate.plates.filter(plate =>
            plate.name.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredPlates.length > 0) {
            return (
              <div key={index}>
                <p className='my-2 color-text-primary text-2xl text-center'>{group_plate.category}</p>
                <div className='row grid grid-cols-2'>
                  {filteredPlates.map((plate, index) =>
                    <CardFood key={index} title={plate.name} price={plate.price} url_image={plate.img_url} />
                  )}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      }
    </div>
  );
}
