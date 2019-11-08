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
    const msg = {
      to: mail.to(),
      from: mail.from(),
      subjet: mail.subject(),
      text: mail.text(),
      html: mail.html()
    }
    await sgMail.send(msg)
  }
}

module.exports.SendgridSender = SendgridSender
