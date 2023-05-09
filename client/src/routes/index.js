import {Navigate, useRoutes} from "react-router-dom";
// layouts
import MainLayout from "../layouts/main";
// import SimpleLayout from '../layouts/simple';
// import CompactLayout from '../layouts/compact';
//
import {AboutPage, Homepage, ServicesPage} from "./elements";
import Signup from "../sections/auth/Signup/Signup";
import Login from "../sections/auth/Login/Login";
import ServicePage from "../pages/customer/ServicePage";
// import ServicesPage from '../pages/customer/ServicesPage';

// ----------------------------------------------------------------------

export default function Router() {
  const user = localStorage.getItem("token");
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: user ? <Homepage /> : <Navigate replace to="/login" />,
          index: true,
        },
        {
          path: "/services",
          element: user ? <ServicesPage /> : <Navigate replace to="/login" />,
        },
        {
          path: "/services/:id",
          element: user ? <ServicePage /> : <Navigate replace to="/login" />,
        },
        {
          path: "/about",
          element: user ? <AboutPage /> : <Navigate replace to="/login" />,
        },
      ],
    },
    {path: "/signup", element: <Signup />},
    {path: "/login", element: <Login />},
  ]);
}
