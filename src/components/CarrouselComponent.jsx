import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import homeroCheff from '../imgs/homero_cheff.svg'
import uploadMenu from '../imgs/upload_menu.svg'
import video_register_menu from '../videos/video_register_menu.mp4'
export default function CarrouselComponent(props) {
  const {user} = useAuth()
  return (
    <div className={` rounded-md bg-video border ${props.className}`}>
        <div className={`flex items-${!user?"end":"center"} justify-center pl-2 pt-2`}>
            <div>
                <p className='mb-5 text-black bg-white text-lg'>{!user?"¡Explora con tu cuenta hoy!":"¡Publica tu menú para que todos puedan verlo!"}</p>
                <Link className='glow-on-hover p-3 mb-2 text-center rounded block	' to="/auth/login">¡{!user?"Iniciar sesion":"Publicar Menú"}!</Link>
            </div>
            <img style={{ maxHeight:"200px" }} src={!user?homeroCheff:uploadMenu} alt="Imagen homero cheff" />
        </div>
        <video autoPlay loop muted className='w-52'>
        <source src={video_register_menu} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
}
