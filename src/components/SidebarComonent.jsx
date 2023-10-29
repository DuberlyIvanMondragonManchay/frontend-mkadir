import { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { other_icons } from '../components/ui/Icons'
export default function SidebarComonent() {
    const { user } = useAuth();
    const location = useLocation();
  
    useEffect(() => {
      const spaceSidebar = document.getElementById('sidebar-multi-level-sidebar');
  
      if (spaceSidebar) {
        if (user) {
            spaceSidebar.classList.remove('mt-0')
            if (location.pathname === "/") {
            spaceSidebar.classList.add('mt-28');
          } else {
            spaceSidebar.classList.remove('mt-28');
          }
        } else {
          spaceSidebar.classList.remove('mt-0')
          if (location.pathname === "/") {
            spaceSidebar.classList.add('mt-16');
          } else {
            spaceSidebar.classList.remove('mt-16');
          }
        }
      }
    }, [user, location.pathname]);
  
    const LinkComponent = (props) => {
        return (
            <li>
                <Link to={props.linkUrl} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img className='flex-shrink-0 w-5 h-5' src={props.icon} alt={`Icono ${props.text}`} />
                <span className="flex-1 ml-3 whitespace-nowrap">{props.text}</span>
                </Link>
            </li>
        )

    }
  return (      
    <aside id="sidebar-multi-level-sidebar" className={`bg-white mt-0 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0`} aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
            
            <LinkComponent icon={other_icons.home} linkUrl="/" text="Home"/>
            <LinkComponent icon={other_icons.login} linkUrl="/auth/login" text="Login"/>
            <LinkComponent icon={other_icons.register} linkUrl="/auth/register/options" text="Register"/>
            <LinkComponent icon={other_icons.information} linkUrl="/auth/register/options" text="Acerca de"/>
        </ul>
    </div>
    </aside>
  )
}
