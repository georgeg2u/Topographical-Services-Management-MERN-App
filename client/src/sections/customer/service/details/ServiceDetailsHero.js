import PropTypes from "prop-types";
// @mui
import {styled, alpha} from "@mui/material/styles";
import {
  Typography,
  Stack,
  Link,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";

// utils
import {bgGradient} from "../../../../utils/cssStyles";
// components
import Iconify from "../../../../components/iconify/Iconify";

import CustomerDataContext from "../../../../context/CustomerDataContext";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {CloudUpload} from "@mui/icons-material";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({theme}) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
}));

// ----------------------------------------------------------------------

export default function ServiceDetailsHero({serviceData}) {
  const {_id, title, companyName, location} = serviceData;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isContractAccepted, setIsContractAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successAlerts, setSuccessAlerts] = useState([false, false, false]);
  const [isFinalServiceUploaded, setIsFinalServiceUploaded] = useState(false);
  const [finalServiceData, setFinalServiceData] = useState([]);

  const {
    firstName: contextFirstName,
    lastName: contextLastName,
    email: contextEmail,
  } = useContext(CustomerDataContext);

  const contractData = {
    serviceId: _id,
    customerFirstName: contextFirstName,
    customerLastName: contextLastName,
    customerEmail: contextEmail,
    companyName: companyName,
    location: location,
    serviceName: title,
    status: "pending",
  };

  const handleSelectService = async () => {
    try {
      let url = "http://localhost:8080/api/contracts";
      const {data: res} = await axios.post(url, contractData);
      toast.success(res.message);
      setIsButtonDisabled(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    async function fetchContractData() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/contracts/${_id}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch details for selected service");
        }
        const data = await response.json();
        if (data.status === "pending" && data.customerEmail === contextEmail) {
          setIsButtonDisabled(true);
        }
        if (data.status === "accepted" && data.customerEmail === contextEmail) {
          setIsContractAccepted(true);
        }
        if (data.status === "accepted" && data.finalServiceDocument) {
          setIsFinalServiceUploaded(true);
          setFinalServiceData(data.finalServiceDocument)
        }
      } catch (error) {
        throw new Error("Could not fetch details for selected service");
      }
    }
    fetchContractData();
  }, [_id,contextEmail]);


  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFiles([]);
    setSuccessAlerts([false, false, false]);
  };

  const handleFileChange = (fileIndex, e) => {
    const files = e.target.files;
    const selectedFile = files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      const updatedSuccessAlerts = [...successAlerts];
      updatedSuccessAlerts[fileIndex] = false; 
      updatedSuccessAlerts[3] = true; 
      setSuccessAlerts(updatedSuccessAlerts);
      return;
    }

    const updatedFiles = [...selectedFiles];
    updatedFiles[fileIndex] = selectedFile;
    setSelectedFiles(updatedFiles);

    const updatedSuccessAlerts = [...successAlerts];
    updatedSuccessAlerts[fileIndex] = true;
    updatedSuccessAlerts[3] = false; 
    setSuccessAlerts(updatedSuccessAlerts);
  };

  const handleUpload = async () => {
    try {
      const data = {
        propertyDocument: selectedFiles[0]
          ? await getBase64String(selectedFiles[0])
          : null,
        identityDocument: selectedFiles[1]
          ? await getBase64String(selectedFiles[1])
          : null,
        fiscalDocument: selectedFiles[2]
          ? await getBase64String(selectedFiles[2])
          : null,
      };

      const response = await axios.post(
        `http://localhost:8080/api/contracts/upload/${_id}`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to upload documents.");
      }

      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading documents.");
    }
  };

  const getBase64String = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  };

  const handleDownloadDocument = document => {
    const byteArray = new Uint8Array(document.data);
    const blob = new Blob([byteArray], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  return (
    <StyledRoot>
      <Container>
        <Stack
          spacing={5}
          direction={{xs: "column", md: "row"}}
          justifyContent={{md: "space-between"}}
        >
          <Stack spacing={{xs: 3, md: 2}} sx={{color: "common.white"}}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>

            <Stack
              spacing={3}
              direction={{xs: "column", md: "row"}}
              sx={{opacity: 0.48}}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{typography: "body2"}}
              >
                <Iconify icon="mdi:business" sx={{mr: 1}} />
                <Link color="inherit" underline="always">
                  {companyName}
                </Link>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                sx={{typography: "body2"}}
              >
                <Iconify icon="carbon:location" sx={{mr: 1}} /> {location}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            sx={{width: 1, maxWidth: 340}}
          >
            <Stack spacing={2} alignItems="center" sx={{width: 1}}>
              {!isContractAccepted && (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSelectService}
                  disabled={isButtonDisabled}
                >
                  {!isButtonDisabled
                    ? "Alege serviciul"
                    : "Cererea a fost trimisă catre companie."}
                </Button>
              )}
              {isContractAccepted  && (
                <Stack spacing={2} alignItems="center" sx={{width: 1}}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleClick}
                  >
                    Încarcă documente
                  </Button>
                </Stack>
              )}
               {isFinalServiceUploaded && (
                <Stack spacing={2} alignItems="center" sx={{width: 1}}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handleDownloadDocument(finalServiceData)}
                  >
                    Vizualizează serviciul finalizat
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          Încarcă documentele necesare pentru finalizarea serviciului
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              fullWidth
              component="label"
            >
              Actul de proprietate al imobilului
              <input
                type="file"
                style={{display: "none"}}
                onChange={e => handleFileChange(0, e)}
              />
            </Button>
            {successAlerts[0] && (
              <Alert severity="success" sx={{mt: 2}}>
                Documentul a fost încărcat cu succes!
              </Alert>
            )}
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              fullWidth
              component="label"
            >
              Actul de identitate al proprietarului
              <input
                type="file"
                style={{display: "none"}}
                onChange={e => handleFileChange(1, e)}
              />
            </Button>
            {successAlerts[1] && (
              <Alert severity="success" sx={{mt: 2}}>
                Documentul a fost încărcat cu succes!
              </Alert>
            )}
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              fullWidth
              component="label"
            >
              Certificatul fiscal eliberat de autoritatea locală.
              <input
                type="file"
                style={{display: "none"}}
                onChange={e => handleFileChange(2, e)}
              />
            </Button>
            {successAlerts[2] && (
              <Alert severity="success" sx={{mt: 2}}>
                Documentul a fost încărcat cu succes!
              </Alert>
            )}

            {successAlerts[3] && (
              <Alert severity="error" sx={{mt: 2}}>
                Fișierul trebuie să fie de tip PDF.
              </Alert>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Anulează</Button>
          <Button variant="contained" onClick={handleUpload}>
            Încarcă
          </Button>
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}

ServiceDetailsHero.propTypes = {
  job: PropTypes.shape({
    category: PropTypes.string,
    location: PropTypes.string,
    slug: PropTypes.string,
  }),
};
