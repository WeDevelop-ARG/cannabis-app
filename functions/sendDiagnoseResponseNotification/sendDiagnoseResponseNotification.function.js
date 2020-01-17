const database = require('../database/index.js')
const sender = require('../mailing/sender')
const functions = require('firebase-functions')

const buildTextMessage = (username) => {
  return (
    `Hola, ${username}!\n\n
    ¡Tu solicitud de diagnóstico ha sido respondida por uno de nuestros profesionales!\n\n
    Ingresá a la sección <b>Mis Consultas</b> dentro de la aplicación para leer su respuesta.\n\n
    ¡Te esperamos pronto!\n\n\n
    Dr. Cannabis`
  )
}

const buildHtmlMessage = (username) => {
  return `
    <html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
      </head>
      <body style="font-family: Roboto, Arial, Helvetica, sans-serif; background-color: #FFFFFF; display: flex;">
        <div style="margin: 0 auto; background-color: #FAFAFA; padding: 20px; border: 1px solid #E5E5E5; height: fit-content;">
          <h1>Hola, <b>${username}</b>!</h1>
          <h3>¡Tu solicitud de diagnóstico ha sido respondida por uno de nuestros profesionales!</h3>
          <p>Ingresá a la sección <b>Mis Consultas</b> dentro de la aplicación para leer su respuesta.</p>
          <p>¡Te esperamos pronto!</p>
          <br />
          <h3>Dr. Cannabis</h3>
        </div>
      </body>
    </html>
  `
}

const sendNotification = async (user) => {
  const ss = new sender.SendgridSender(functions.config().sendgrid.api_key)
  await ss.send({
    to: user.email,
    from: 'info@wedevelop.me',
    subject: 'Dr. Cannabis - Tu solicitud de diagnóstico ha sido respondida!',
    text: buildTextMessage(user.username),
    html: buildHtmlMessage(user.username)
  })
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
