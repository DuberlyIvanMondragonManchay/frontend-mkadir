import FormMenu from '../../../components/forms/FormMenu'
import MenuAdminPage from '../../../pages/admin/restaurant/menu/MenuAdminPage'
const menus_admin_routes = [
    { path: "",element:<MenuAdminPage/>},
    { path: "create",element:<FormMenu/>},
    { path: "update/:menu_id",element:<FormMenu/>},
  ]

export default menus_admin_routes 