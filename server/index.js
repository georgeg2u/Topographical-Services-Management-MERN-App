require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const companiesRoutes = require("./routes/companies");
const searchRoutes = require("./routes/search");
const contractsRoutes = require("./routes/contracts");
const bodyParser = require("body-parser");



//database connection
connection();

//middlewares
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());



//routes
app.use("/api/users", userRoutes);
app.use("/api/companies", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/company/settings", companiesRoutes);
app.use("/api/company/search", searchRoutes);
app.use("/api/contracts", contractsRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
