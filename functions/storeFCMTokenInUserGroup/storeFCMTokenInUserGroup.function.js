const functions = require('firebase-functions')
const { getNotificationKey, runFCMOperation, createNotificationGroup } = require('../notifications/index.js')

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

module.exports = storeFCMTokenInUserGroup
