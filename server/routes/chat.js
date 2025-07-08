const router = require("express").Router();
const OpenAI = require("openai");
const Service = require("../models/service");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const serviceTitle = [
  "Cadastru si intabulare teren intravilan",
  "Cadastru si intabulare casa",
  "Cadastru si intabulare teren extravilan",
  "Trasare teren",
  "Releveu imobil",
  "Dezmembrare/Lotizare teren",
  "Plan topografic de situatie",
  "Alipire terenuri",
  "Actualizare/Rectificare cadastru",
];

const systemPrompt = `
Ești un asistent cadastral. Primești întrebări de la utilizatori și trebuie să extragi:
{
  "serviciu": "tipul de serviciu dorit",
  "oras": "orașul menționat (dacă există)",
  "buget": "buget maxim (număr), dacă este menționat"
}
Dacă nu poți extrage un câmp, setează-l pe null.
`;

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const extraction = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const parsed = JSON.parse(extraction.choices[0].message.content);
    const { serviciu, oras, buget } = parsed;

    if (!serviciu || !oras) {
      const optiuni = serviceTitle.map(t => `• ${t}`).join("\n");
      return res.json({
        response: `Nu am înțeles exact ce cauți. Iată câteva servicii disponibile:\n\n${optiuni}\n\nPoți scrie de exemplu: "Vreau ${serviceTitle[0]} în Cluj".`,
        results: [],
      });
    }

    const query = {
      title: new RegExp(serviciu, "i"),
      location: new RegExp(oras, "i")
    };
    if (buget) {
      query.price = { $lte: parseInt(buget) };
    }

    const matching = await Service.find(query).limit(5);

    if (!matching.length) {
      const altOptiuni = serviceTitle.map(t => `• ${t}`).join("\n");
      return res.json({
        response: `Nu am găsit oferte pentru "${serviciu}" în ${oras}. Poate te interesează alte servicii:\n\n${altOptiuni}`,
        results: [],
      });
    }

    const responseText = `Am găsit ${matching.length} oferte pentru "${serviciu}" în ${oras}:`;
    const results = matching.map(s => ({
      text: `${s.companyName} – ${s.title} (${s.price} RON)`,
      link: `/services/${s._id}`
    }));

    res.json({
      response: responseText,
      results,
    });

  } catch (error) {
    console.error("Eroare în chat:", error);
    res.status(500).json({
      response: "A apărut o eroare la procesarea cererii. Încearcă din nou mai târziu.",
      results: [],
    });
  }
});

module.exports = router;
