const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const companySchema = new mongoose.Schema({
    role: {type: String, required: true},
    denumire: {type: String, required: true},
    cui: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
  });

  companySchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
      expiresIn: "365d",
    });
    return token;
  };

  const Company = mongoose.model("company", companySchema);

const validateCompany = data => {
  const schema = Joi.object({
    role: Joi.string().required().label("Role"),
    denumire: Joi.string().required().label("Denumire"),
    cui: Joi.string().required().label("Cod unic de identificare"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {Company, validateCompany};
