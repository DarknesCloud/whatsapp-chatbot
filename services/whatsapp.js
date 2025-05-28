const axios = require('axios');
const URL = `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`;

exports.sendMessage = async (to, message) => {
  try {
    await axios.post(
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
  } catch (error) {
    console.error(
      'Error sending message:',
      error.response?.data || error.message
    );
  }
};
