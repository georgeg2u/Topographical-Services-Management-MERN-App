import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {Group, MapsHomeWork} from "@mui/icons-material";
import moment from "moment";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import CompanyDataContext from "../../../context/CompanyDataContext";
import ServicesPieChart from "../homepage/PieServicesPrice";

const ServicesCards = () => {
  const [services, setServices] = useState([]);

  const {
    denumire: contextDenumire,
    logo: contextLogo,
  } = useContext(CompanyDataContext);


  useEffect(() => {
    const url = "http://localhost:8080/api/company/search";
    const fetchData = async () => {
      try {
        const response = await axios.post(url, {
          denumire: contextDenumire
        });
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [contextDenumire]);

  const calculateNumberOfLocations = (services) => {
    const uniqueLocations = new Set();
  
    services.forEach((service) => {
      uniqueLocations.add(service.location);
    });
  
    return uniqueLocations.size;
  };

  const numberOfLocations = calculateNumberOfLocations(services);
 
  
  return (
    <>
      <Paper elevation={3} sx={{p: 3, backgroundColor: "#454F5B"}}>
        <Typography variant="h4" sx={{color: "#FFFFFF"}}>
          Servicii furnizate
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group
            sx={{
              height: 100,
              width: 100,
              mr: 1,
              opacity: 0.8,
              color: "primary.main",
            }}
          />
          <Typography variant="h4" sx={{color: "#FFFFFF"}}>
            {services.length}
          </Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p: 3, backgroundColor: "#454F5B"}}>
        <Typography variant="h4" sx={{color: "#FFFFFF"}}>
          Locații acoperite
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapsHomeWork
            sx={{
              height: 100,
              width: 100,
              opacity: 0.8,
              color: "primary.main",
              mr: 1,
            }}
          />
          <Typography variant="h4" sx={{color: "#FFFFFF"}}>
           {numberOfLocations} 
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{p: 2, gridColumn: 3, gridRow: "1/3", backgroundColor: "#454F5B"}}
      >
        <Box>
          <Typography sx={{color: "#FFFFFF"}}>
            Servicii adăugate recent
          </Typography>
          <List>
            {services.slice(0, 4).map((service, i) => (
              <Box key={service._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={service?.title}
                      src={contextLogo}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{color: "#FFFFFF"}}
                    primary={service?.title}
                    secondary={`Added: ${moment(service?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p: 2, gridColumn: "1/3", backgroundColor: '#454F5B'}}>
        <ServicesPieChart services={services}/>
      </Paper>
    </>
  );
};

export default ServicesCards;
