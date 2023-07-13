import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CompanyDataContext from "../../context/CompanyDataContext";
import {Helmet} from "react-helmet-async";
import {ThemeProvider, createTheme} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UserAccountSettings = () => {
  const {
    _id: contextId,
    denumire: contextDenumire,
    email: contextEmail,
    cui: contextCui,
    logo: contextLogo,
    updateCompanyData,
  } = useContext(CompanyDataContext);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "&.edit-mode .MuiInputBase-input": {
              color: "#454F5B",
            },
            "&.edit-mode .MuiInputLabel-root": {
              color: "#454F5B",
            },
          },
        },
      },
    },
  });

  const [editing, setEditing] = useState(false);
  const [companyName, setCompanyName] = useState(contextDenumire || "");
  const [email, setEmail] = useState(contextEmail || "");
  const [cui, setCui] = useState(contextCui || "");
  const [avatarImage, setAvatarImage] = useState(contextLogo || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!editing) {
      setCompanyName(contextDenumire || "");
      setEmail(contextEmail || "");
      setCui(contextCui || "");
      setAvatarImage(contextLogo || "");
    }
  }, [editing, contextDenumire, contextEmail, contextCui, contextLogo]);

  const handleEditClick = () => {
    setEditing(true);
    setShowChangePassword(false);
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword(prevState => !prevState);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentPassword("");
  setNewPassword("");
  };

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(prevState => !prevState);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(prevState => !prevState);
  };

  const handleSaveClick = async () => {
    setEditing(false);

    try {
      const url = "http://localhost:8080/api/company/settings";
      const data = {
        _id: contextId,
        denumire: companyName,
        email,
        cui,
        logo: avatarImage,
        currentPassword,
        newPassword,
      };

      const response = await axios.put(url, data);

      updateCompanyData({
        denumire: response.data.company.denumire,
        email: response.data.company.email,
        cui: response.data.company.cui,
        logo: response.data.company.logo,
      });
      localStorage.setItem("company-token", response.data.token);

      setCurrentPassword("");
      setNewPassword("");
      toast.success("Datele au fost actualizate cu succes!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          "Noua parolă nu respectă formatul obligatoriu. Aceasta trebuie să conțină cel puțin 8 caractere, o majusculă, un număr și un caracter special.",
          {position: toast.POSITION.TOP_RIGHT}
        );
      }
      if (error.response && error.response.status === 401) {
        toast.error(
          "Parola curentă nu respectă formatul obligatoriu. Aceasta trebuie să conțină cel puțin 8 caractere, o majusculă, un număr și un caracter special.",
          {position: toast.POSITION.TOP_RIGHT}
        );
      }
      if (error.response && error.response.status === 402) {
        toast.error("Parola curentă este incorectă.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (error.response && error.response.status === 409) {
        toast.error("Adresa de email introdusă este asociată deja unui cont.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleAvatarChange = event => {
    if (editing) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        setAvatarImage(e.target.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Cont</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography
          variant="h3"
          color="primary.main"
          sx={{marginBottom: "50px"}}
        >
          DATELE CONTULUI
        </Typography>
        <label htmlFor="avatar-input">
          <Avatar
            sx={{
              width: theme => theme.spacing(8),
              height: theme => theme.spacing(8),
              marginBottom: theme => theme.spacing(2),
              cursor: editing ? "pointer" : "default",
            }}
            src={avatarImage}
          />
        </label>
        {editing && (
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            style={{display: "none"}}
            onChange={handleAvatarChange}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          {editing ? (
            <>
              <ThemeProvider theme={theme}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  margin="normal"
                  className={"edit-mode"}
                  sx={{
                    width: "250px",
                    height: "50px",
                  }}
                />

                <Button variant="outlined" onClick={handleToggleChangePassword} sx={{color: '#454F5B', borderColor: '#454F5B'}}>
                  Schimbă parola
                </Button>

                {showChangePassword && (
                  <>
                    <TextField
                      label="Parolă curentă"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      margin="normal"
                      className="edit-mode"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={handleToggleCurrentPasswordVisibility}
                            edge="end"
                            aria-label="toggle current password visibility"
                          >
                            {showCurrentPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        ),
                      }}
                    />

                    <TextField
                      label="Parolă nouă"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      margin="normal"
                      className="edit-mode"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={handleToggleNewPasswordVisibility}
                            edge="end"
                            aria-label="toggle new password visibility"
                          >
                            {showNewPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </>
                )}
              </ThemeProvider>
              <Box>
                <Button
                  variant="contained"
                  sx={{marginRight: "8px"}}
                  onClick={handleCancelEdit}
                >
                  Anulează
                </Button>

                <Button
                  variant="contained"
                  sx={{marginLeft: "8px"}}
                  onClick={handleSaveClick}
                >
                  Salvează
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5" color="#454F5B">
                Nume companie: {companyName}
              </Typography>
              <Typography variant="body1" color="#454F5B">
                Email: {email}
              </Typography>
              <Button variant="outlined" onClick={handleEditClick}>
                Editează
              </Button>
            </>
          )}
          <ToastContainer />
        </Box>
      </Box>
    </>
  );
};

export default UserAccountSettings;
