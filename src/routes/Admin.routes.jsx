import RestaurantAdminPage from "../pages/admin/RestaurantAdminPage";
import AdminPage from '../pages/AdminPage'
const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants", element: <RestaurantAdminPage/> }
  ];

export default admin_routes