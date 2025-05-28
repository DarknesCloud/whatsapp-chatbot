const express = require('express');
const router = express.Router();

// Respuesta a mensajes entrantes
router.post('/', async (req, res) => {
  console.log('✅ Se recibió un POST en /webhook');
  console.log('🪵 Cuerpo del mensaje:', JSON.stringify(req.body, null, 2));

  const body = req.body;

  if (body.object) {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (message) {
      const from = message.from;
      const text = message.text?.body;

      console.log(`📨 Mensaje recibido de ${from}: ${text}`);

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
