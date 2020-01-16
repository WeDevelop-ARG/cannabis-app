const sgMail = require('@sendgrid/mail')

class Sender {
  async send (mail) {
  }
}

class SendgridSender extends Sender {
  constructor (apiKey) {
    sgMail.setApiKey(apiKey)
    super()
  }

  async send (mail) {
    await sgMail.send(mail)
  }
}

module.exports.SendgridSender = SendgridSender
