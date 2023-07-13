import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import {IconButton, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const {data: res} = await axios.post(url, data);
      if (res.data.role === "customer") {
        localStorage.setItem("token", res.data.token);
        window.location = "/";
      } else if (res.data.role === "company") {
        localStorage.setItem("company-token", res.data.token);
        window.location = "/company/";
        console.log(res.data);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Conectează-te!</h1>
            <TextField
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
              sx={{mt: "5px"}}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Parola"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
              sx={{mt: "5px"}}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <button type="submit" className={styles.green_btn}>
              Conectare
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Nu ai un cont?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Înregistrează-te!
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
