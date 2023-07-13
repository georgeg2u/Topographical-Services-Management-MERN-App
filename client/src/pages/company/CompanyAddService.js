import {Helmet} from "react-helmet-async";
import CompanyMyServicesView from "../../sections/company/view/CompanyMyServicesView";

const CompanyMyServices = () => {
  return (
    <>
      <Helmet>
        <title>Adaugă serviciu</title>
      </Helmet>
      <CompanyMyServicesView />
    </>
  );
};

export default CompanyMyServices;
