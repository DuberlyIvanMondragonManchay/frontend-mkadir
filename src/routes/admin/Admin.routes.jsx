import AdminPage from '../../pages/AdminPage'
import { Outlet } from "react-router-dom";
import restuarants_admin_routes from './restaurant/RestaurantAdmin.routes'
import profile_admin_routes from './profile/ProfileAdmin.routes'

const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants/*", element: <Outlet/>,children:restuarants_admin_routes},
    { path: "profile/*", element: <Outlet/>,children:profile_admin_routes}
  ];

export default admin_routes