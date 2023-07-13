import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "../layouts/main";
import {
  AboutPage,
  ContactPage,
  Homepage,
  ServicesPage,
} from "./elements";
import Signup from "../sections/auth/Signup/Signup";
import Login from "../sections/auth/Login/Login";
import ServicePage from "../pages/customer/ServicePage";
import CompanyMainLayout from "../layouts/company-layouts/CompanyMainLayout";
import UserAccountSettings from "../pages/company/CompanyMySettings";
import CompanyHomePage from "../pages/company/CompanyHomePage";
import CompanyMyServices from "../pages/company/CompanyMyServices";
import CompanyAddServiceView from "../sections/company/view/CompanyAddServiceView";

// ----------------------------------------------------------------------

export default function Router() {
  const user = localStorage.getItem("token");
  const companyUser = localStorage.getItem("company-token");
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
        {
          path: "/contact",
          element: user ? <ContactPage /> : <Navigate replace to="/login" />,
        },
      ],
    },
    {path: "/signup", element: <Signup />},
    {path: "/login", element: <Login />},
    {
      element: <CompanyMainLayout />,
      children: [
        {
          path: "/company",
          element: companyUser ? <CompanyHomePage /> : <Navigate replace to="/login" />,
        },
        {
          path: "/company/add-service",
          element: companyUser ? <CompanyAddServiceView /> : <Navigate replace to="/login" />,
        },
        {
          path: "/company/services",
          element: companyUser ? <CompanyMyServices /> : <Navigate replace to="/login" />,
        },
        {
          path: "/company/settings",
          element: companyUser ? <UserAccountSettings /> : <Navigate replace to="/login" />,
        },
      ],
    },
  ]);
}
