const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const message = req.body?.Payload?.Content?.Text;
  const sender = req.body?.Payload?.Contact?.Name;

  console.log(`Mensagem de ${sender}: ${message}`);

  return res.status(200).send({ ok: true });
});

app.get('/', (req, res) => {
  res.send('Bot Umbler está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
