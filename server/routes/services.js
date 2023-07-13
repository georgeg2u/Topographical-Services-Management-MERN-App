const router = require("express").Router();
const Service = require("../models/service");

router.get("/", async (req, res) => {
  try {
    const jobs = await Service.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({message: "Service not found"});
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.post("/", async (req, res) => {
  try {
    const serviceData = req.body; // Obține datele serviciului din corpul cererii

    // Creează o instanță a modelului Service cu datele primite
    const newService = new Service(serviceData);

    // Salvează noul serviciu în baza de date
    await newService.save();

    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
