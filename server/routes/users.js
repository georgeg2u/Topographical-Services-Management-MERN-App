const router = require('express').Router();
const {User, validate} = require("../models/user");
const { Company, validateCompany} = require('../models/company');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
  try {
    let Model, validationSchema, errorMessage;

    if (req.body.role === "customer") {
      Model = User;
      validationSchema = validate;
      errorMessage = "Customer with given email already exists!";
    } else if (req.body.role === "company") {
      Model = Company;
      validationSchema = validateCompany;
      errorMessage = "Company with given email already exists!";
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }

    const { error } = validationSchema(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await Model.findOne({ email: req.body.email });
    if (user)
      return res.status(409).send({ message: errorMessage });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Model({
      ...req.body,
      password: hashPassword,
    }).save();

    res.status(200).send({ message: `${req.body.role} created successfully` });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
