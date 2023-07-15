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
  logo: {type: String},
});

companySchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      cui: this.cui,
      denumire: this.denumire,
      role: this.role,
      logo: this.logo,
    },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "365d",
    }
  );
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
    logo: Joi.string().label("logo"),
  });
  return schema.validate(data);
};

const validateModifyCompany = data => {
  const schema = Joi.object({
    _id: Joi.string().required().label("id"),
    denumire: Joi.string().required().label("Denumire"),
    email: Joi.string().email().required().label("Email"),
    cui: Joi.string().label("Cod unic de identificare"),
    logo: Joi.string().label("logo").allow(""),
    currentPassword: passwordComplexity().label("Current Password").allow(""),
    newPassword: passwordComplexity().label("New Password").allow(""),
  });
  return schema.validate(data);
};

module.exports = {Company, validateCompany, validateModifyCompany};
