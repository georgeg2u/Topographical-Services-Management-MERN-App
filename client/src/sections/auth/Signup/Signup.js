import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

const Signup = () => {
  const [data, setData] = useState({
    role: "customer",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    denumire: "",
    cui: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = ({currentTarget: input}) => {
    setData(prevData => ({...prevData, [input.name]: input.value}));
  };
  

  const handleRoleChange = role => {
    if (data.role !== role) {
      setData({...data, role: role});
    }
  };


  const handleSubmit = async event => {
    event.preventDefault();
    console.log(data.role)
    try {
      let url;
      let userData = {};
      if (data.role === "customer") {
        url = "http://localhost:8080/api/users";
        userData = {
          role: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        };
      } else if (data.role === "company") {
        url = "http://localhost:8080/api/companies";
        userData = {
          role: data.role,
          denumire: data.denumire,
          cui: data.cui,
          email: data.email,
          password: data.password,
        };
      }
      const {data: res} = await axios.post(url, userData);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Ai deja un cont?</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Conectează-te!
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Inregistrare cont</h1>
            <div className={styles.role_buttons}>
              <button
                type="button"
                name="role"
                value="customer"
                autoFocus
                onClick={() => handleRoleChange("customer")}
              >
                Client
              </button>
              <button
                type="button"
                name="role"
                value="company"
                onClick={() => handleRoleChange("company")}
              >
                Furnizor de servicii
              </button>
            </div>
            <RegisterForm handleChange={handleChange} data={data} />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Inregistrare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function CustomerInputs({handleChange, data}) {
  return (
    <>
      <input
        type="text"
        placeholder="Prenume"
        name="firstName"
        onChange={handleChange}
        value={data.firstName}
        required
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Nume"
        name="lastName"
        onChange={handleChange}
        value={data.lastName}
        required
        className={styles.input}
      />
    </>
  );
}

function CompanyInputs({handleChange, data}) {
  return (
    <>
      <input
        type="text"
        placeholder="Denumire"
        name="denumire"
        onChange={handleChange}
        value={data.denumire}
        required
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Cod identificare"
        name="cui"
        onChange={handleChange}
        value={data.cui}
        required
        className={styles.input}
      />
    </>
  );
}

function RegisterForm({handleChange, data}) {
  return (
    <>
      {data.role === "customer" && (
        <CustomerInputs handleChange={handleChange} data={data} />
      )}
      {data.role === "company" && (
        <CompanyInputs handleChange={handleChange} data={data} />
      )}
      <>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Parola"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />
      </>
    </>
  );
}

export default Signup;
