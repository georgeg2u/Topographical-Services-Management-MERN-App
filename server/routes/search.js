const router = require("express").Router();
const Service = require("../models/service");

router.post("/", async (req, res) => {
  try {
    const services = await Service.find({ companyName: req.body.denumire });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;