const router = require("express").Router();
const {Company, validateModifyCompany} = require("../models/company");
const bcrypt = require("bcrypt");

router.put("/", async (req, res) => {
  try {
    const {_id, email, denumire, cui, logo, currentPassword, newPassword} =
      req.body;

    const company = await Company.findById(_id);
    if (!company) {
      return res.status(404).send({message: "Company not found"});
    }

    const existingCompany = await Company.findOne({email, _id: {$ne: _id}});
    if (existingCompany) {
      return res
        .status(409)
        .send({message: "Email already exists for another company"});
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      company.password
    );
    const {error} = validateModifyCompany(req.body);
    if (error) {
      if (error.details[0].path[0] === "currentPassword") {
        return res.status(401).send({message: "Invalid current password"});
      } else if (error.details[0].path[0] === "newPassword") {
        if (!currentPassword) {
          return res.status(401).send({message: "Invalid current password"});
        }
        if (!passwordMatches) {
          return res.status(402).send({message: "Invalid current password"});
        }
        return res.status(400).send({message: "Invalid new password format"});
      }
    }

    if (currentPassword && !newPassword) {
      if (passwordMatches) {
        return res.status(400).send({message: "Invalid new password format"});
      }
      return res.status(402).send({message: "Invalid current password"});
    }

    if (!currentPassword && newPassword) {
      return res.status(401).send({message: "Invalid current password"});
    }

    if (currentPassword && newPassword) {
      const passwordMatches = await bcrypt.compare(
        currentPassword,
        company.password
      );
      if (!passwordMatches) {
        return res.status(402).send({message: "Invalid current password"});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      company.password = hashedPassword;
    }

    company.email = email;
    company.denumire = denumire;
    company.cui = cui;
    company.logo = logo;

    await company.save();

    const updatedCompany = await Company.findById(_id);

    const token = updatedCompany.generateAuthToken();

    res.status(200).send({
      message: "Company updated successfully",
      company: updatedCompany,
      token: token,
    });
  } catch (error) {
    res.status(500).send({message: "Internal server error"});
  }
});

module.exports = router;
