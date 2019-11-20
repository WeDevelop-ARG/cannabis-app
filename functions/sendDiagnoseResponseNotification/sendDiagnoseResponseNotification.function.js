const database = require('../database/index.js')
const Mail = require('../mailing/mail.js')
const sender = require('../mailing/sender')
const functions = require('firebase-functions')

const buildTextMessage = (username) => {
  return (
    `Hola ${username}!\n\n
    Tu solicitud de diagnóstico ha sido respondida por uno de nuestros profesionales\n\n
    No olvides consultar la aplicación en la sección de respuestas para acceder al resultado del diagnóstico !\n\n\n\n
    Te saluda atentamente...\n
    Dr. Cannabis`
  )
}

const buildHtmlMessage = (username) => {
  return (
    `<html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
      </head>
      <body style="position:absolute; width:100%; height:100%">
        <div style="background-color: #DAFFED; height: 100%; width:100%; display:flex;">
          <div style="margin: auto;  background-color:#9BF3F0; padding: 20px; border: 2px solid #4A0D67;  vertical-align:center">
            <h1 style="font-family: Roboto">Hola <span style="color:#473198"> ${username} </span>!</h1>
            <h3 style="font-family: Roboto">Tu solicitud de diagnóstico ha sido respondida por uno de nuestros profesionales</h3>
            <h3 style="font-family: Roboto">No olvides consultar la aplicación en la sección de respuestas para acceder al resultado del diagnóstico!</h3>
            <br />
            <br />
            <br />
            <h4 style="font-family: Roboto">Te saluda atentamente...</h4>
            <h3 style="font-family: Roboto">Dr. Cannabis</h3>
          </div>
        </div>
      </body>
    </html>`
  )
}

const sendNotification = async (user) => {
  const mail = new Mail()
  mail.to = user.email
  mail.from = 'drcannabis@drcannabis.com'
  mail.subject = 'Tu solicitud de diagnóstico ha sido respondida!'
  mail.text = buildTextMessage(user.username)
  mail.html = buildHtmlMessage(user.username)
  const ss = new sender.SendgridSender(process.env.SENGRID_API_KEY)
  await ss.send(mail)
}

const sendDiagnoseResponseNotification = functions
  .firestore
  .document('diagnoses/{diagnoseId}')
  .onUpdate(async (snapshot, context) => {
    const diagnose = snapshot.after.data()
    const answerBefore = snapshot.before.data().answered
    const answerAfter = diagnose.answered
    if (!answerBefore && answerAfter) {
      const user = await database.getUserByUID(diagnose.user)
      if (user) await sendNotification(user)
    }
  })

module.exports = sendDiagnoseResponseNotification
