import {Helmet} from "react-helmet-async";
import CompanyMyContractsView from "../../sections/company/view/CompanyMyContractsView";

const CompanyMyContracts = () => {
  return (
    <>
      <Helmet>
        <title>Contractele mele</title>
      </Helmet>
      <CompanyMyContractsView />    
    </>
  );
};

export default CompanyMyContracts;
