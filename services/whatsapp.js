const axios = require('axios');

const URL = `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`;

exports.sendMessage = async (to, message) => {
  try {
    const response = await axios.post(
      URL,
      {
        messaging_product: 'whatsapp',
        to,
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // Puedes descomentar si quieres logging para debug
    // console.log('Mensaje enviado con éxito:', response.data);
  } catch (error) {
    // Mejor detalle del error para debugging
    if (error.response) {
      console.error('Error enviando mensaje:', error.response.data);
    } else {
      console.error('Error enviando mensaje:', error.message);
    }
  }
};
