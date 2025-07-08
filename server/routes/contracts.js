const router = require("express").Router();
const Contract = require("../models/contract");
const OpenAI = require("openai");
const pdfParse = require("pdf-parse");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const contractData = req.body;

    const newContract = new Contract(contractData);

    await newContract.save();

    res
      .status(201)
      .json({message: "Contract inițiat cu succes!", contract: newContract});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.get("/:serviceId", async (req, res) => {
  try {
    const {serviceId} = req.params;
    const contract = await Contract.findOne({serviceId});
    if (!contract) {
      return res.status(404).json({message: "No contracts for this service."});
    }
    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.post("/company", async (req, res) => {
  try {
    const contracts = await Contract.find({companyName: req.body.denumire});
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.delete("/refuse/:serviceId", async (req, res) => {
  try {
    const {serviceId} = req.params;

    const deletedContract = await Contract.findOneAndDelete({serviceId});

    if (!deletedContract) {
      return res.status(404).json({message: "Contract not found."});
    }

    res.status(200).json({message: "Cererea a fost refuzată cu succes!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.put("/accept/:serviceId", async (req, res) => {
  try {
    const {serviceId} = req.params;

    const updatedContract = await Contract.findOneAndUpdate(
      {serviceId},
      {status: "accepted"},
      {new: true}
    );

    if (!updatedContract) {
      return res.status(404).json({message: "Contract not found."});
    }

    res.status(200).json({message: "Cererea a fost acceptată cu succes!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});


router.post("/upload/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { propertyDocument, identityDocument, fiscalDocument } = req.body;

    const contract = await Contract.findOne({ serviceId });
    if (!contract) {
      return res.status(404).json({ message: "Contract not found." });
    }

    if (propertyDocument) {
      contract.propertyDocument = Buffer.from(propertyDocument, "base64");
    }
    if (identityDocument) {
      contract.identityDocument = Buffer.from(identityDocument, "base64");
    }
    if (fiscalDocument) {
      contract.fiscalDocument = Buffer.from(fiscalDocument, "base64");
    }

    await contract.save();
    res.status(200).json({ message: "Documentele au fost încărcate cu succes!", contract });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/final-upload/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { finalServiceDocument } = req.body;

    const contract = await Contract.findOne({ serviceId });
    if (!contract) {
      return res.status(404).json({ message: "Contract not found." });
    }

    if (finalServiceDocument) {
      contract.finalServiceDocument = Buffer.from(finalServiceDocument, "base64");
    }
    await contract.save();

    res.status(200).json({ message: "Contractul a fost trimis catre client!", contract });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/verify-property", async (req, res) => {
  try {
    const { file, documentType } = req.body;

    if (!file || documentType !== "property") {
      return res.status(400).json({ message: "Date lipsă sau tip greșit." });
    }

    const buffer = Buffer.from(file, "base64");
    const pdfData = await pdfParse(buffer);
    const extractedText = pdfData.text;

    console.log("Text extras din actul de proprietate:\n", extractedText);

    const prompt = `
Ai extras textul dintr-un posibil act de proprietate al unui imobil.

Verifică următoarele aspecte esențiale:
- ✅ Este menționat clar numele complet al proprietarului?
- ✅ Este specificată adresa completă a imobilului?
- ✅ Apare termenul "act de proprietate", "contract de vânzare" sau ceva similar?
- ✅ Există semnături sau referiri la autentificare notarială?
- ✅ Data semnării este prezentă?

Răspunde în română, pe linii separate cu simboluri clare:
✅ dacă este prezent și corect  
⚠️ dacă lipsește sau este incomplet

Textul documentului:
"""
${extractedText}
"""`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = aiResponse.choices[0].message.content;
    res.json({ feedback });
  } catch (error) {
    console.error("Eroare la verificarea actului de proprietate:", error);
    res.status(500).json({ message: "Eroare internă la analiza documentului." });
  }
});





module.exports = router;
