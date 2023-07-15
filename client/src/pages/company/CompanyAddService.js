import {Helmet} from "react-helmet-async";
import CompanyAddServiceView from "../../sections/company/view/CompanyAddServiceView";

const CompanyAddService = () => {
  return (
    <>
      <Helmet>
        <title>Adaugă serviciu</title>
      </Helmet>
      <CompanyAddServiceView />
    </>
  );
};

export default CompanyAddService;
