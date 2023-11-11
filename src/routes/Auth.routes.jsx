import LoginPage from '../pages/LoginPage'

import RegisterPage from '../pages/register/RegisterPage'


const auth_routes = [
    { path: "login", element: <LoginPage/> },
    { path: "register", element: <RegisterPage/>}
  ];
export default auth_routes