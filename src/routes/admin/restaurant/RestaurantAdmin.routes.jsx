import { Outlet } from "react-router";
import FormRestaurant from "../../../components/forms/FormRestaurant";
import RestaurantAdminPage from "../../../pages/admin/restaurant/RestaurantAdminPage";
import menus_admin_routes from '../restaurant/MenuAdmin.routes'

const restuarants_admin_routes = [
    { path: "",element:<RestaurantAdminPage/>},
    { path: "create",element:<FormRestaurant/>},
    { path: "update/:restaurant_id",element:<FormRestaurant/>},
    { path: ":restaurant_id/menus/*",element:<Outlet/>,children:menus_admin_routes},

  ]



export default restuarants_admin_routes;