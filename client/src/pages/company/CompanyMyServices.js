import {Helmet} from "react-helmet-async";
import CompanyMyServicesView from "../../sections/company/view/CompanyMyServicesView";

const CompanyMyServices = () => {
  return (
    <>
      <Helmet>
        <title>Serviciile mele</title>
      </Helmet>
      <CompanyMyServicesView />
    </>
  );
};

export default CompanyMyServices;
