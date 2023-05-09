import {Suspense, lazy} from "react";
import LoadingScreen from "../components/loading-screen";

const Loadable = Component => props =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const AboutPage = Loadable(lazy(() => import('../pages/customer/AboutPage')));
// export const CareerContactPage = Loadable(lazy(() => import('../pages/career/CareerContactPage')));
export const ServicesPage = Loadable(
  lazy(() => import("../pages/customer/ServicesPage"))
);
export const Homepage = Loadable(
  lazy(() => import("../pages/customer/Homepage"))
);
