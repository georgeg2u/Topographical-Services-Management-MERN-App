import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

const CompanyDataContext = createContext();

export const CompanyDataProvider = ({children}) => {
  const [denumire, setDenumire] = useState("-");
  const [email, setEmail] = useState("-");
  const [cui, setCui] = useState("");
  const [logo, setLogo] = useState("/assets/images/company/unknown-person.png");
  const [_id, setId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("company-token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setEmail(decodedToken.email);
      setDenumire(decodedToken.denumire);
      setCui(decodedToken.cui);
      setLogo(decodedToken.logo);
      setId(decodedToken._id);
    }
  }, []);

  const updateCompanyData = updatedData => {
    setDenumire(updatedData.denumire || denumire);
    setEmail(updatedData.email || email);
    setCui(updatedData.cui || cui);
    setLogo(updatedData.logo || logo);
    setId(updatedData._id || _id);
  };

  const values = {
    _id,
    denumire,
    logo,
    email,
    cui,
    updateCompanyData,
  };

  return (
    <CompanyDataContext.Provider value={values}>
      {children}
    </CompanyDataContext.Provider>
  );
};

export default CompanyDataContext;
