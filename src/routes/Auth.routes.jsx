import { Outlet } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import RegisterOptionsPage from '../pages/register/RegisterOptions'
import RegisterAsRestaurant from '../pages/register/RegisterAsRestaurant'
import FormRegisterPersonalData from '../components/forms/FormRegisterPersonalData'
import FormRegisterPersonalAccount from '../components/forms/FormRegisterPersonalAccount'
import RegisterPage from '../pages/register/RegisterPage'
const register_auth_routes = [
    { path: "options", element: <RegisterOptionsPage/> },
    { path: "restaurant", element: <RegisterAsRestaurant/> },
    { path: "personal-data", element: <FormRegisterPersonalData/> },
    { path: "personal-account", element: <FormRegisterPersonalAccount/> }
  ];

const auth_routes = [
    { path: "login", element: <LoginPage/> },
    { path: "register/*", element: <RegisterPage/> , children: register_auth_routes}
  ];
export default auth_routes