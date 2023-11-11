import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { other_icons } from '../components/ui/Icons'
import { FiSun } from 'react-icons/fi'
import {MdDarkMode} from 'react-icons/md'
export default function SidebarComonent() {
    const { user,logout,handleChangeTheme,theme } = useAuth();
    const LinkComponent = (props) => {
        return (
            <li onClick={props.onClick}>
                <Link to={props.linkUrl} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {props.react_icon?props.react_icon:
                <img className='flex-shrink-0 w-5 h-5' src={props.icon} alt={`Icono ${props.text}`} />
                }
                <span className="flex-1 ml-3 whitespace-nowrap">{props.text}</span>
                </Link>
            </li>
        )

    }
  return (      
    <aside id="sidebar-multi-level-sidebar" className={` ${user?"mt-24":"mt-0"} bg-white fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0`} aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <ul className="space-y-2 font-medium">

            <LinkComponent icon={other_icons.home} linkUrl="/" text="Home"/>
        {user?
            <LinkComponent onClick={()=>logout()}icon={other_icons.logout} linkUrl="/auth/login" text="Cerrar Sesion"/>
        :
        <>
            <LinkComponent icon={other_icons.login} linkUrl="/auth/login" text="Login"/>
            <LinkComponent icon={other_icons.register} linkUrl="/auth/register" text="Register"/>
        </>
        
        }
            <LinkComponent icon={other_icons.information} linkUrl="#" text="Acerca de"/>
            <LinkComponent onClick={handleChangeTheme} react_icon={theme=="dark"?<FiSun/>:<MdDarkMode/>} linkUrl="#" text= {`Modo ${theme=="dark" ? "Claro":"Oscuro"}`}/>
        </ul>
    </div>
    </aside>
  )
}
