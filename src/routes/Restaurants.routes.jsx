import { Outlet } from 'react-router-dom';
import GetEmployeesPage from '../pages/restaurant/employees/GetEmployeesPage'
import GetRestaurantsPage from '../pages/restaurant/GetRestaurantsPage'
import GetMenusPage from '../pages/restaurant/menu/GetMenusPage'
import GetMenuIsPublishedPage from '../pages/restaurant/menu/GetMenuIsPublishedPage'
import GetWorkSchedulePage from '../pages/restaurant/work_schedule/GetWorkSchedulePage'

import RestaurantDetailsPage from '../pages/restaurant/RestaurantDetailsPage'
import Menu from '../components/restaurat/Menu'
import Location from '../components/restaurat/Location'
import AuthRequired from '../middlewares/AuthRequired';
import GetRestaurantPage from '../pages/restaurant/GetRestaurantPage';
const employees_routes = [
  { path: "", element: <GetEmployeesPage/> }
]

const work_schedule_routes = [
  { path: "", element: <GetWorkSchedulePage/> }
]

const menu_routes = [
  { path: "", element:<AuthRequired><GetMenusPage/></AuthRequired>  },
  { path: "is-published", element: <GetMenuIsPublishedPage/> },
]

const restaurant_details_routes = [
  { path: "menu", element: <Menu/> },
  { path: "location", element: <Location/> },
]

const RestaurantsRoutes = [
  { path: ":id_restaurant/employees/*", element: <AuthRequired/>, children: employees_routes },
  { path: ":id_restaurant/work-schedule/*", element: <AuthRequired/>, children: work_schedule_routes },
  { path: "menu/*", element: <Outlet/>, children: menu_routes },
  { path: ":id_restaurant/details/*", element: <RestaurantDetailsPage/>, children: restaurant_details_routes },
  { path: "", element: <AuthRequired children={<GetRestaurantsPage/>}/>},
  { path: ":id_restaurant", element: <AuthRequired children={<GetRestaurantPage/>}/>},
];

export default RestaurantsRoutes