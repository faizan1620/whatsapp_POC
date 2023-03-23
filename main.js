require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const sendWhatsappMessage = require('./util/whatsapp')
const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_VERIFY_TOKEN } = process.env

app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.post('/whatsapp', bodyParser.json(), async (req, res) => {
    let body = req.body
    const whatsappAccessToken = WHATSAPP_ACCESS_TOKEN

      const result = await sendWhatsappMessage(
        body,
        whatsappAccessToken
      )

      if (result.error) {
        console.log('Error sending to Whatsapp', result.error)
        return
      }
      res.status(200).send(result)
  })


  app.get('/whatsapp/webhook', function(req, res) {
    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == WHATSAPP_VERIFY_TOKEN
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
  });
  
  app.post("/whatsapp/webhook", function (request, response) {
    console.log('Incoming webhook: ' + JSON.stringify(request.body));
    const webhook = parseWhatsappWebhook(request.body)
    const { text, from, whatsappId } = webhook
    console.log("webhook=",webhook)
    console.log("Id=",whatsappId)
    console.log("sender=",from)
    console.log("message=",text)
    response.sendStatus(200);
  });

  if (!module.parent) {
    console.log('app listening on port 3000')
    app.listen(3000)
  }



module.exports = app
