const functions = require('firebase-functions')
const { getNotificationKey, runFCMOperation } = require('../notifications/index.js')

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

module.exports = removeFCMTokenInUserGroup
