const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const twilio = require('twilio');
const app = express();
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const OPENAIAPIKey = process.env.OPENAIAPIKey;
const OPENAIEndpoint = process.env.OPENAIEndpoint

const PORT = process.env.PORT || 3000;

// Twilio setup
const accountSid = ACCOUNT_SID;
const authToken = AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// OpenAI GPT-3.5-turbo setup
const openAIEndpoint = OPENAIEndpoint;
const openAIAPIKey = OPENAIAPIKey; // Replace with your actual OpenAI API key
const gpt3Model = 'gpt-3.5-turbo'; // Specify the GPT-3 model here

app.use(bodyParser.urlencoded({ extended: true }));

// Keep track of users who have said "hi"
const usersWithHi = new Set();

// Handle incoming WhatsApp messages
app.post('/whatsapp', async (req, res) => {
  const incomingMessage = req.body.Body.toLowerCase();
  const senderNumber = req.body.From;

  if (incomingMessage.includes('hi')) {
    usersWithHi.add(senderNumber);
    const welcomeMessage = 'Hello! How can I assist you today?';
    sendWhatsAppMessage(senderNumber, welcomeMessage);
  } else {
    // Call GPT-3.5-turbo for response for all incoming messages
    const gpt3Response = await generateGPT3Response(incomingMessage);
    sendWhatsAppMessage(senderNumber, gpt3Response.choices[0].message.content);
  }

  res.status(200).end();
});

// Function to call OpenAI GPT-3.5-turbo API
async function generateGPT3Response(message) {
  const response = await axios.post(
    openAIEndpoint,
    {
      model: gpt3Model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIAPIKey}`
      }
    }
  );

  return response.data;
}

// Function to send a WhatsApp message
function sendWhatsAppMessage(to, message) {
  client.messages
    .create({
      body: message,
      from: 'whatsapp:Twilio_number', // Twilio Sandbox number
      to: `whatsapp:whatsapp_number`
    })
    .then(message => console.log(`WhatsApp message sent: ${message.sid}`))
    .catch(error => console.error(`Error sending WhatsApp message: ${error.message}`));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
