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

module.exports = sendWhatsappMessage
  