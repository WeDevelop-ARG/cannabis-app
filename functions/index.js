const admin = require('firebase-admin')
const functions = require('firebase-functions')
const fetch = require('node-fetch')

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
    const notificationKeyName = `appUser-${context.params.userUID}`
    const notificationKey = await getNotificationKey(notificationKeyName)

    if (notificationKey !== null) {
      const payload = {
        notification: {
          title: '¡Tu solicitud de diagnóstico ha sido respondida!',
          body: 'Ingresá a la aplicación para leer la respuesta del profesional.'
        }
      }

      try {
        const deviceGroupResponse = await admin.messaging().sendToDeviceGroup(notificationKey, payload)
        console.log(JSON.stringify(deviceGroupResponse))
        if (deviceGroupResponse.failureCount > 0) {
          await runFCMOperation('remove', notificationKeyName, notificationKey, deviceGroupResponse.failedRegistrationTokens)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

const fetchNotificationRequest = async (url, method, body) => {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key = ${functions.config().fcm.api_key}`,
        project_id: functions.config().fcm.sender_id
      }
    }
    if (method === 'post') {
      options.body = JSON.stringify(body)
    }
    const response = await fetch(url, options)
    return await response.text()
  } catch (error) {
    console.log(error)
    return null
  }
}

const getNotificationKey = async (notificationKeyName) => {
  const url = `https://fcm.googleapis.com/fcm/notification?notification_key_name=${notificationKeyName}`
  try {
    const result = await fetchNotificationRequest(url, 'get', {})
    console.log(result)
    const json = JSON.parse(result)
    if (json.notification_key !== undefined) {
      return json.notification_key
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const createNotificationGroup = async (notificationKeyName, fcmToken) => {
  const url = 'https://fcm.googleapis.com/fcm/notification'
  const data = {
    operation: 'create',
    notification_key_name: notificationKeyName,
    registration_ids: [fcmToken]
  }
  const result = await fetchNotificationRequest(url, 'post', data)
  console.log(result)
}

const runFCMOperation = async (operation, notificationKeyName, notificationKey, fcmTokens) => {
  const url = 'https://fcm.googleapis.com/fcm/notification'
  const body = {
    operation: operation,
    notification_key_name: notificationKeyName,
    notification_key: notificationKey,
    registration_ids: fcmTokens
  }
  const result = await fetchNotificationRequest(url, 'post', body)
  console.log(result)
}

const storeFCMTokenInUserGroup = functions
  .https
  .onCall(async (data, context) => {
    const fcmToken = data.fcmToken
    const uid = context.auth.uid
    const notificationKeyName = 'appUser-' + uid
    const notificationKey = await getNotificationKey(notificationKeyName)

    if (notificationKey === null) {
      await createNotificationGroup(notificationKeyName, fcmToken)
    } else {
      await runFCMOperation('add', notificationKeyName, notificationKey, [fcmToken])
    }
  })

const removeFCMTokenInUserGroup = functions
  .https
  .onCall(async (data, context) => {
    const fcmToken = data.fcmToken
    const uid = context.auth.uid
    const notificationKeyName = 'appUser-' + uid
    const notificationKey = await getNotificationKey(notificationKeyName)

    if (notificationKey !== null) {
      await runFCMOperation('remove', notificationKeyName, notificationKey, [fcmToken])
    }
  })

exports.sendDiagnoseResponsePushNotification = sendDiagnoseResponsePushNotification
exports.onDiagnoseCreateMigrateToUserCollection = onDiagnoseCreateMigrateToUserCollection
exports.onAnswerMigrateToUserCollection = onAnswerMigrateToUserCollection
exports.storeFCMTokenInUserGroup = storeFCMTokenInUserGroup
exports.removeFCMTokenInUserGroup = removeFCMTokenInUserGroup
