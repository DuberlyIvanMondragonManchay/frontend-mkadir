import RestaurantAdminPage from "../pages/admin/restaurant/RestaurantAdminPage";
import AdminPage from '../pages/AdminPage'
import FormRestaurant from "../components/forms/FormRestaurant";
import { Outlet } from "react-router-dom";
import GetRestaurantAdminPage from "../pages/admin/restaurant/GetRestaurantAdminPage";
const restuarants_admin_routes = [
  { path: "",element:<RestaurantAdminPage/>},
  { path: ":restaurant_id",element:<GetRestaurantAdminPage/>},
  { path: "create",element:<FormRestaurant/>},
  { path: "update/:restaurant_id",element:<FormRestaurant/>},
]
const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants/*", element: <Outlet/>,children:restuarants_admin_routes}
  ];

export default admin_routes