import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/", async (req, res) => {
  const mensagem = req.body?.Payload?.Content?.Text;

  if (!mensagem) {
    return res.status(400).send("Mensagem inválida");
  }

  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: mensagem }],
    });

    const texto = resposta.choices[0].message.content;

    // Formato que a Umbler espera:
    return res.json({
      replies: [
        {
          type: "text",
          content: texto,
        },
      ],
    });
  } catch (err) {
    console.error("Erro ao chamar OpenAI:", err.message);
    return res.status(500).send("Erro ao processar");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
