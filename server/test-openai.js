require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Salut! Ce este un plan cadastral?" }
      ],
    });

    console.log("\n✅ Răspuns de la GPT:");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("\n❌ Eroare OpenAI:");
    console.error(error?.response?.data || error.message);
  }
}

testOpenAI();
