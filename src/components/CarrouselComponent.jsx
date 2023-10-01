import {Link} from 'react-router-dom'
import homeroCheff from '../imgs/homero_cheff.svg'
export default function CarrouselComponent() {

  return (
    <div className='bg-color-primary rounded-md'>
        <div className='flex items-end justify-center px-2 pt-2'>
            <div>
                <p className='mb-5 text-white text-lg'>¡Explora con tu cuenta hoy!</p>
                <Link className='bg-gray-300 p-3 mb-2 text-center rounded block	' to="/register/options">¡Regístrate!</Link>
            </div>
            <img src={homeroCheff} alt="Imagen homero cheff" />
        </div>
    </div>
  );
}
