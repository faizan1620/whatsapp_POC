const { WHATSAPP_API_URL, PHONE_NUMBER_ID } = process.env


const sendWhatsappMessage = async (body, token) => {
    console.log('Sending message to Whatsapp...')
    const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
  
    const data = await response.json()
  
    return data
  }

// Parse webhook body recieved from Whatsapp
const parseWhatsappWebhook = (event) => {
  let webhookBody
  event.entry.forEach(function (entry) {
    let webhookEvent = entry.changes[0].value.messages[0]
    webhookBody = webhookEvent
    webhookBody.to =  entry.changes[0].value.metadata.display_phone_number
  })
  return webhookBody
}

module.exports = {
  sendWhatsappMessage,
  parseWhatsappWebhook
}
  