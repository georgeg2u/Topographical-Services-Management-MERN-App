import {
  Card,
  Stack,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
  Box,
  Alert,
  styled,
  DialogContent,
} from "@mui/material";

import TextMaxLine from "../../../components/text-max-line";
import Modal from "@mui/material/Modal";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const MyContractItem = ({contract, onContractRefused}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContractAccepted, setIsContractAccepted] = useState(false);
  const [areDocumentsVisible, setAreDocumentsVisible] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleRefuseClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefuseContract = async () => {
    try {
      const {data: res} = await axios.delete(
        `http://localhost:8080/api/contracts/refuse/${contract.serviceId}`
      );
      onContractRefused(contract.serviceId);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleAcceptClick = async () => {
    try {
      const {data: res} = await axios.put(
        `http://localhost:8080/api/contracts/accept/${contract.serviceId}`
      );
      setIsContractAccepted(true);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const StyledAlert = styled(Alert)({
    textTransform: "none",
  });

  useEffect(() => {
    if (
      contract.identityDocument ||
      contract.propertyDocument ||
      contract.fiscalDocument
    ) {
      setAreDocumentsVisible(true);
    } else {
      setAreDocumentsVisible(false);
    }
  }, [contract]);

  const handleViewDocumentsClick = () => {
    setIsDocumentModalOpen(true);
  };

  const handleDownloadDocument = document => {
    const byteArray = new Uint8Array(document.data);
    const blob = new Blob([byteArray], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  const handleUploadService = () => {
    setIsUploadModalOpen(true);
  };

  const handleFileInputChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    try {
      const data = {
        finalServiceDocument: selectedFile
          ? await getBase64String(selectedFile)
          : null,
      };

      const response = await axios.post(
        `http://localhost:8080/api/contracts/final-upload/${contract.serviceId}`,
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

  return (
    <>
      <Card
        sx={{
          "&:hover": {
            boxShadow: theme => theme.customShadows.z24,
          },
        }}
      >
        <Stack sx={{p: 3, pb: 0}}>
          <Stack spacing={0.5} sx={{mt: 3, mb: 2}}>
            <TextMaxLine variant="h6" line={1} sx={{textAlign: "center"}}>
              {contract.serviceName}
            </TextMaxLine>

            <Typography variant="body2">
              Nume Client:
              <Box component="span" sx={{color: "info.main"}}>
                {contract.customerFirstName + " " + contract.customerLastName}
              </Box>
            </Typography>

            <Typography variant="body2">
              Mail Client:
              <Box component="span" sx={{color: "info.main"}}>
                {contract.customerEmail}
              </Box>
            </Typography>

            <Typography variant="body2">
              Locație:
              <Box component="span" sx={{color: "info.main"}}>
                {contract.location}
              </Box>
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{borderStyle: "dashed", my: 1}} />

        <Grid
          spacing={1.5}
          sx={{
            p: 3,
            pt: 0,
            typography: "body2",
            color: "text.secondary",
            textTransform: "capitalize",
          }}
        >
          {!isContractAccepted && contract.status !== "accepted" ? (
            <Grid container spacing={1.5} justifyContent="space-between">
              <Grid sx={{display: "flex", justifyContent: "flex-start"}}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{bgcolor: "#FF0000", color: "#FFF"}}
                  onClick={handleRefuseClick}
                >
                  Refuză
                </Button>
              </Grid>
              <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{bgcolor: "#00FF00", color: "#FFF"}}
                  onClick={handleAcceptClick}
                >
                  Acceptă
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{p: 3}}>
              <StyledAlert severity="success">
                Contractul a fost acceptat. Vei putea vizualiza documentele
                clientului după ce acesta le încarcă.
              </StyledAlert>
            </Box>
          )}

          {areDocumentsVisible && (
            <Grid container spacing={1} justifyContent="space-between">
              <Grid sx={{display: "flex", justifyContent: "flex-start"}}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{bgcolor: "#0000FF", color: "#FFF"}}
                  onClick={handleViewDocumentsClick}
                >
                  Vezi documente
                </Button>
              </Grid>
              <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{bgcolor: "#0000FF", color: "#FFF"}}
                  onClick={handleUploadService}
                >
                  Incarcă serviciul finalizat
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Card>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Confirmare refuz
          </Typography>
          <Typography variant="body2" sx={{mt: 2}}>
            Sigur doriți să refuzați acest contract?
          </Typography>
          <Button variant="contained" sx={{mt: 2}} onClick={handleCloseModal}>
            Anulează
          </Button>
          <Button
            variant="contained"
            sx={{mt: 2, ml: 2}}
            onClick={handleRefuseContract}
          >
            Refuză contract
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Documente încărcate de client
          </Typography>
          {contract.identityDocument && (
            <Button
              variant="contained"
              sx={{mt: 2}}
              onClick={() => handleDownloadDocument(contract.identityDocument)}
            >
              Vizualizează document identitate
            </Button>
          )}
          {contract.propertyDocument && (
            <Button
              variant="contained"
              sx={{mt: 2}}
              onClick={() => handleDownloadDocument(contract.propertyDocument)}
            >
              Vizualizează document proprietate
            </Button>
          )}
          {contract.fiscalDocument && (
            <Button
              variant="contained"
              sx={{mt: 2}}
              onClick={() => handleDownloadDocument(contract.fiscalDocument)}
            >
              Vizualizează document fiscal
            </Button>
          )}
        </Box>
      </Modal>

      <Modal open={isUploadModalOpen} onClose={handleUploadModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <DialogContent>
            <Typography variant="h6" component="div">
              Încarcă documentația serviciului finalizat
            </Typography>
            <Box
              sx={{
                border: "2px dashed grey",
                borderRadius: "4px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <input
                type="file"
                style={{display: "none"}}
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => fileInputRef.current.click()}
              >
                Selectează fișier
              </Button>
            </Box>
            {selectedFile && (
              <Typography variant="body2" sx={{mt: 1}}>
                Fișier selectat: {selectedFile.name}
              </Typography>
            )}
          </DialogContent>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid sx={{display: "flex", justifyContent: "flex-start"}}>
              <Button sx={{mt: 2}} onClick={handleUploadModalClose}>
                Închide
              </Button>
            </Grid>
            <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                variant="contained"
                sx={{mt: 2}}
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Incarcă serviciul finalizat
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default MyContractItem;
