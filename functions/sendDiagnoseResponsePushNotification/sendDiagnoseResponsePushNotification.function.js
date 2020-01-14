const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { getNotificationKey, runFCMOperation } = require('../notifications/index.js')

const sendDiagnoseResponsePushNotification = functions
  .firestore
  .document('users/{userUID}/requests/{diagnoseUID}/responses/{responseUID}')
  .onCreate(async (snapshot, context) => {
    const notificationKeyName = `appUser-${context.params.userUID}`
    const notificationKey = await getNotificationKey(notificationKeyName)

    if (notificationKey !== null) {
      const payload = {
        notification: {
          title: '¡Tu solicitud ha sido respondida!',
          body: 'Ingresa para ver la nueva respuesta.'
        }
      }

      try {
        const deviceGroupResponse = await admin.messaging().sendToDeviceGroup(notificationKey, payload)
        if (deviceGroupResponse.failureCount > 0) {
          await runFCMOperation('remove', notificationKeyName, notificationKey, deviceGroupResponse.failedRegistrationTokens)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

module.exports = sendDiagnoseResponsePushNotification
