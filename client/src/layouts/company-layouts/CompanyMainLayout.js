import Navbar from "../../components/company-components/company-navbar/Navbar";
import {CompanyDataProvider} from "../../context/CompanyDataContext";

export default function CompanyMainLayout() {
  return (
    <CompanyDataProvider>
      <Navbar />
    </CompanyDataProvider>
  );
}
