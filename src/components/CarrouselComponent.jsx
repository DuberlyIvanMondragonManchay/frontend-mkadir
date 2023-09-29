import {Link} from 'react-router-dom'
import homeroCheff from '../imgs/homero_cheff.svg'
export default function CarrouselComponent() {

  return (
    <div className='bg-color-primary rounded-md'>
        <div className='flex items-end justify-center px-2 pt-2'>
            <div>
                <p className='mb-5 text-white text-lg'>Registra tu restaurante y administralo</p>
                <Link className='bg-gray-300 p-3 mb-2 text-center rounded block	' to="/register/options">Registrar</Link>
            </div>
            <img src={homeroCheff} alt="Imagen homero cheff" />
        </div>
    </div>
  );
}
