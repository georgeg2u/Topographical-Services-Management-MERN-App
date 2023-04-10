// const router = require("express").Router();
// const {User} = require("../models/user");
// const Joi = require("joi");
// const bcrypt = require("bcrypt");
// const { Company } = require("../models/company");

// // router.post("/", async (req, res) => {
// //   try {
// //     const {error} = validate(req.body);
// //     if (error) return res.status(400).send({message: error.details[0].message});

// //     const user = await User.findOne({email: req.body.email});
// //     if (!user)
// //       return res.status(401).send({message: "Invalid Email or Password"});

// //     const validPassword = await bcrypt.compare(
// //       req.body.password,
// //       user.password
// //     );
// //     if (!validPassword)
// //       return res.status(401).send({message: "Invalid Email or Password"});

// //     const token = user.generateAuthToken();
// //     res.status(200).send({data: token, message: "Logged in successfully"});
// //   } catch (error) {
// //     res.status(500).send({message: "Internal Server Error"});
// //   }
// // });

// router.post("/", async (req, res) => {
//   try {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send({message: error.details[0].message});

//     const user = await Company.findOne({email: req.body.email});
//     if (!user)
//       return res.status(401).send({message: "Invalid Email or Password"});

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)
//       return res.status(401).send({message: "Invalid Email or Password"});

//     const token = user.generateAuthToken();
//     res.status(200).send({data: token, message: "Logged in successfully"});
//   } catch (error) {
//     res.status(500).send({message: "Internal Server Error"});
//   }
// });


// const validate = data => {
//   const schema = Joi.object({
//     email: Joi.string().email().required().label("Email"),
//     password: Joi.string().required().label("Password"),
//   });
//   return schema.validate(data);
// };

// module.exports = router;

const router = require("express").Router();
const {User} = require("../models/user");
const {Company} = require("../models/company");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    let role = "customer";
    if (!user) {
      user = await Company.findOne({ email: req.body.email });
      if (!user) return res.status(401).send({ message: "Invalid Email or Password" });
      role = "company";
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: { token, role }, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = data => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
