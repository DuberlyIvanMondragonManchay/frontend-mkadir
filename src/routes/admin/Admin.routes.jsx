import AdminPage from '../../pages/AdminPage'
import { Outlet } from "react-router-dom";
import restuarants_admin_routes from './restaurant/RestaurantAdmin.routes'
import profile_admin_routes from './profile/ProfileAdmin.routes'
import FormEmployee from "../../components/forms/FormEmployee";
import EmployeeAdminPage from "../../pages/admin/restaurant/employee/EmployeeAdminPage";

const employees_admin_routes = [
  { path: "", element: <EmployeeAdminPage /> },
  { path: "create", element: <FormEmployee /> },
  { path: "update/:employee_id", element: <FormEmployee /> },
];
const admin_routes = [
    { path: "", element: <AdminPage/> },
    { path: "restaurants/*", element: <Outlet/>,children:restuarants_admin_routes},
    { path: "profile/*", element: <Outlet/>,children:profile_admin_routes},
    { path: "restaurants/:restaurant_id/employees/*", element: <Outlet />, children: employees_admin_routes },
  ];

  
  
export default admin_routes