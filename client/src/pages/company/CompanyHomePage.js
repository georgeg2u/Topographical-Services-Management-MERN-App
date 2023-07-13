import {Helmet} from "react-helmet-async";
import CompanyHomePageView from "../../sections/company/view/CompanyHomePageView";

const CompanyHomePage = () => {
  return (
    <>
      <Helmet>
        <title>Acasă</title>
      </Helmet>
      <CompanyHomePageView />
    </>
  );
};

export default CompanyHomePage;
