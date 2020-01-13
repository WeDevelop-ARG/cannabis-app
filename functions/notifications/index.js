const functions = require('firebase-functions')
const fetch = require('node-fetch')

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

  await fetchNotificationRequest(url, 'post', data)
}

const runFCMOperation = async (operation, notificationKeyName, notificationKey, fcmTokens) => {
  const url = 'https://fcm.googleapis.com/fcm/notification'
  const body = {
    operation: operation,
    notification_key_name: notificationKeyName,
    notification_key: notificationKey,
    registration_ids: fcmTokens
  }

  await fetchNotificationRequest(url, 'post', body)
}

module.exports = { getNotificationKey, createNotificationGroup, runFCMOperation }
