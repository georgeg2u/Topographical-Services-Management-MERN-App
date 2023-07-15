import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

const CustomerDataContext = createContext();

export const CustomerDataProvider = ({children}) => {
  const [firstName, setFirstName] = useState("-");
  const [lastName, setLastName] = useState("-");
  const [email, setEmail] = useState("-");
  const [_id, setId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setFirstName(decodedToken.firstName);
      setLastName(decodedToken.lastName);
      setEmail(decodedToken.email);
      setId(decodedToken._id);
    }
  }, []);

  const values = {
    _id,
    firstName,
    lastName,
    email,
  };

  return (
    <CustomerDataContext.Provider value={values}>
      {children}
    </CustomerDataContext.Provider>
  );
};

export default CustomerDataContext;
