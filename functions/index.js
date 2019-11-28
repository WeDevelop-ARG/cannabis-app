const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

const onDiagnoseCreateMigrateToUserCollection = functions
  .firestore
  .document(`diagnoses/{diagnoseId}`)
  .onCreate(async (snapshot, context) => {
    try {
      const data = snapshot.data()
      const { user, ...dataWithoutUser } = data
      const diagnoseId = snapshot.id
      await admin.firestore().doc(`users/${data.user}/requests/${diagnoseId}`).set(dataWithoutUser)
    } catch (error) {
      console.log(error.message)
    }
  })

const onAnswerMigrateToUserCollection = functions
  .firestore
  .document(`diagnoses/{diagnoseId}`)
  .onUpdate(async (snapshot, context) => {
    try {
      const dataBefore = snapshot.before.data()
      const dataAfter = snapshot.after.data()

      if (!dataBefore.answered && dataAfter.answered) {
        const answer = {
          answer: dataAfter.answer || '',
          answeredBy: dataAfter.answeredBy || '',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        }
        const diagnoseId = snapshot.after.id
        await admin.firestore().collection(`users/${dataBefore.user}/requests/${diagnoseId}/responses`).add(answer)
        await admin.firestore().doc(`users/${dataBefore.user}/requests/${diagnoseId}`).update({
          answered: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  })

const sendDiagnoseResponsePushNotification = functions
  .firestore
  .document('users/{userUID}/requests/{diagnoseUID}/responses/{responseUID}')
  .onCreate(async (snapshot, context) => {    
    try {
      const instancesSnapshot = await admin.firestore().collection(`users/${context.params.userUID}/instances`).get()
      instancesSnapshot.docs.forEach(
        async doc => {
          const payload = {
            notification: {
              title: '¡Tu solicitud de diagnóstico ha sido respondida!',
              body: 'Ingresá a la aplicación para leer la respuesta del profesional.'
            }
          }
          admin.messaging().sendToDevice(doc.data().fcmToken, payload)
        }
      )
    } catch (error) {
      console.log(error.message)
    }
  })

exports.sendDiagnoseResponsePushNotification = sendDiagnoseResponsePushNotification
exports.onDiagnoseCreateMigrateToUserCollection = onDiagnoseCreateMigrateToUserCollection
exports.onAnswerMigrateToUserCollection = onAnswerMigrateToUserCollection
