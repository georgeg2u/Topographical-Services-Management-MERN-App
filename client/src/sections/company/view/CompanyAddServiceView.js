import React, {useContext, useEffect, useState} from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";

import {serviceTitle} from "../../../_mock/assets";
import {counties} from "../../../assets/data/counties";
import {countiesWithLatAndLong} from "../../../assets/data/counties";
import Autocomplete from "@mui/material/Autocomplete";
import CompanyDataContext from "../../../context/CompanyDataContext";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

const CompanyAddServiceView = () => {
  const currentDate = new Date();

  const {
    denumire: contextDenumire,
    logo: contextLogo,
    email: contextEmail,
  } = useContext(CompanyDataContext);

  useEffect(() => {
    setServiceData(prevData => ({
      ...prevData,
      companyName: contextDenumire,
      companyLogo: contextLogo,
      locationMap: [{email: contextEmail}],
    }));
  }, [contextDenumire, contextLogo, contextEmail]);

  const [serviceData, setServiceData] = useState({
    companyName: contextDenumire,
    companyLogo: contextLogo,
    location: "",
    locationMap: [
      {
        phoneNumber: "",
        email: contextEmail,
        latlng: ["", ""],
      },
    ],
    content: "",
    title: "",
    duration: "",
    price: "",
    documents: [],
    benefits: [],
    createdAt: currentDate.toISOString(),
  });

  const handleInputChange = event => {
    const {name, value} = event.target;

    if (name === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");

      setServiceData(prevData => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setServiceData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = event => {
    const {name, checked} = event.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], event.target.value]
        : prevData[name].filter(value => value !== event.target.value),
    }));
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    if (
      serviceData.title.trim() === "" ||
      serviceData.content.trim() === "" ||
      serviceData.location.trim() === "" ||
      serviceData.price.trim() === "" ||
      serviceData.duration.trim() === ""
    ) {
      showErrorToast("Completează toate câmpurile obligatorii. (*)");
      return; // Stop form submission
    }

    console.log(serviceData);

    try {
      let url = "http://localhost:8080/api/services";
      const {data: res} = await axios.post(url, serviceData);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setServiceData({
      companyName: contextDenumire,
      companyLogo: contextLogo,
      location: "",
      locationMap: [
        {
          phoneNumber: "",
          email: contextEmail,
          latlng: ["", ""],
        },
      ],
      content: "",
      title: "",
      duration: "",
      price: "",
      documents: [],
      benefits: [],
      createdAt: currentDate.toISOString(),
    });
  };

  const handleAutocompleteTitleChange = (event, value) => {
    setServiceData(prevData => ({
      ...prevData,
      title: value || "",
    }));
  };

  const handleAutocompleteLocationChange = (event, value) => {
    console.log("counter");
    const selectedCounty = Object.entries(countiesWithLatAndLong).find(
      ([county]) => county === value
    );

    console.log(selectedCounty);

    if (selectedCounty) {
      const [county, {lat, long}] = selectedCounty;

      setServiceData(prevData => ({
        ...prevData,
        location: county,
        locationMap: [
          {
            ...prevData.locationMap[0],
            latlng: [lat, long],
          },
        ],
      }));
    } else {
      setServiceData(prevData => ({
        ...prevData,
        location: value || "",
        locationMap: [
          {
            ...prevData.locationMap[0],
            latlng: ["", ""],
          },
        ],
      }));
    }
  };

  const showErrorToast = message => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <ToastContainer />
      <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <Typography
          variant="h3"
          color="primary.main"
          sx={{marginBottom: "50px", textAlign: "center"}}
        >
          ADĂUGARE SERVICIU
        </Typography>
        <Autocomplete
          options={serviceTitle}
          getOptionLabel={option => option}
          value={serviceData.title !== "" ? serviceData.title : null}
          onChange={handleAutocompleteTitleChange}
          renderInput={params => (
            <TextField
              {...params}
              label="Denumire *"
              name="title"
              value={serviceData.title}
              onChange={handleInputChange}
            />
          )}
        />
        <TextField
          label="Descriere *"
          name="content"
          multiline
          rows={4}
          value={serviceData.content}
          onChange={handleInputChange}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={counties}
              getOptionLabel={option => option}
              value={serviceData.location !== "" ? serviceData.location : null}
              onChange={handleAutocompleteLocationChange}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Locație *"
                  name="location"
                  value={serviceData.location}
                  onChange={handleInputChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Preț (Lei) *"
              name="price"
              value={serviceData.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Durata de realizare (Zile) *</InputLabel>
              <Select
                name="duration"
                value={serviceData.duration}
                onChange={handleInputChange}
              >
                <MenuItem value={"7"}>7 zile</MenuItem>
                <MenuItem value={"14"}>14 zile</MenuItem>
                <MenuItem value={"30"}>30 zile</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography>Documente necesare:</Typography>
        <Box sx={{display: "flex"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="documents"
                    value="Actul de proprietate al imobilului"
                    checked={serviceData.documents.includes(
                      "Actul de proprietate al imobilului"
                    )}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Actul de proprietate al imobilului"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="documents"
                    value="Actele de identitate ale proprietarilor"
                    checked={serviceData.documents.includes(
                      "Actele de identitate ale proprietarilor"
                    )}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Actele de identitate ale proprietarilor"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="documents"
                    value="Certificat fiscal"
                    checked={serviceData.documents.includes(
                      "Certificat fiscal"
                    )}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Certificat fiscal"
              />
            </Grid>
          </Grid>
        </Box>
        <TextField
          label="Beneficii"
          name="benefits"
          value={serviceData.benefits}
          onChange={handleInputChange}
        />
      </Box>

      <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
        <Button variant="contained" type="submit">
          Adaugă serviciul
        </Button>
      </Box>
    </form>
  );
};

export default CompanyAddServiceView;
