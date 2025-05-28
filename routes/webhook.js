const express = require('express');
const router = express.Router();
const { sendMessage } = require('../services/whatsapp');
const Response = require('../models/Response');

// Verificación del Webhook
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Respuesta a mensajes entrantes
router.post('/', async (req, res) => {
  const body = req.body;

  if (body.object) {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (message) {
      const from = message.from;
      const text = message.text?.body;

      // Guardamos la respuesta
      await Response.create({ from, message: text });

      // Ejemplo de menú simple
      if (text.toLowerCase() === 'hola') {
        await sendMessage(
          from,
          'Bienvenido! Escribe:\n1️⃣ Información\n2️⃣ Soporte\n3️⃣ Salir'
        );
      } else if (text === '1') {
        await sendMessage(from, 'Aquí está la información.');
      } else if (text === '2') {
        await sendMessage(from, 'Estamos aquí para ayudarte.');
      } else {
        await sendMessage(
          from,
          "Opción no reconocida. Escribe 'hola' para ver el menú."
        );
      }
    }

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

module.exports = router;
