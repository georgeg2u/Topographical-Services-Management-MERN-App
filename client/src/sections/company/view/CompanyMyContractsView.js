import {Typography} from "@mui/material";
import MyContractsList from "../contracts/MyContractsList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CompanyDataContext from "../../../context/CompanyDataContext";

const CompanyMyContractsView = () => {
    const [contracts, setContracts] = useState([]);
    const { denumire : contextDenumire} = useContext(CompanyDataContext)

    useEffect(() => {
        const url = "http://localhost:8080/api/contracts/company";
        const fetchData = async () => {
          try {
            const response = await axios.post(url, {
              denumire: contextDenumire
            });
            setContracts(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [contextDenumire]);

      const updateContracts = (updatedContracts) => {
        setContracts(updatedContracts);
      };

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{textAlign: "center", mt: 3, mb: 3, color: "primary.main"}}
      >
        Contractele mele
      </Typography>
      <MyContractsList contracts={contracts} updateContracts={updateContracts} />
    </>
  );
};

export default CompanyMyContractsView;
