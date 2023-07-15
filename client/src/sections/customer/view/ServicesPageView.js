import {useState, useEffect, useRef} from "react";
import {Container} from "@mui/material";
import {ServicesList} from "../service/list";
import ServiceFilters from "../service/filters/ServiceFilters";
import axios from "axios";

import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ServicesPageView() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [originalServices, setOriginalServices] = useState([]);
  const location = useLocation();

  const didFetchRef = useRef(false);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };
    fakeLoading();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = "http://localhost:8080/api/services";
        const response = await axios.get(url);
        const servicesData = response.data;
        setServices(servicesData);
        setOriginalServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (didFetchRef.current) return;

    fetchServices();

    return () => {
      didFetchRef.current = true;
    };
  }, []);


  useEffect(() => {
    // Access the filters from location.state and apply them
    const filters = location.state?.filters;
    if (filters) {
      let filteredServices = originalServices;

      if (filters.filterKeyword) {
        filteredServices = filteredServices.filter((service) =>
          service.title.toLowerCase().includes(filters.filterKeyword.toLowerCase())
        );
      }

      if (filters.filterLocation) {
        filteredServices = filteredServices.filter((service) =>
          service.location.toLowerCase().includes(filters.filterLocation.toLowerCase())
        );
      }

      setServices(filteredServices);
    }
  }, [location.state, originalServices]);



  const handleFiltersSubmit = filters => {
    const filterKeyword = filters.filterKeyword;
    const filterLocation = filters.filterLocation;
    const filterPrice = filters.filterPrice;

    let filteredServices = originalServices;

    if (filterKeyword) {
      filteredServices = filteredServices.filter(service =>
        service.title.toLowerCase().includes(filterKeyword.toLowerCase())
      );
    }

    if (filterLocation) {
      filteredServices = filteredServices.filter(service =>
        service.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (filterPrice) {
      filteredServices = filteredServices.filter(
        service =>
          service.price >= filterPrice[0] && service.price <= filterPrice[1]
      );
    }

    setServices(filteredServices);
  };

  return (
    <>
      <Container>
        <ServiceFilters onFiltersSubmit={handleFiltersSubmit} />
        <ServicesList jobs={services} loading={loading} />
       
      </Container>
    </>
  );
}
