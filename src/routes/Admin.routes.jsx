import RestaurantAdminPage from "../pages/admin/RestaurantAdminPage";
import AdminPage from '../pages/AdminPage'
import GetRestaurantAdminPage from '../pages/admin/GetRestaurantAdminPage'
const restuarants_admin_routes = [
  { path: ":id_restaurant",element:<GetRestaurantAdminPage/>}
]
const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants/*", element: <RestaurantAdminPage/>,children:restuarants_admin_routes}
  ];

export default admin_routes