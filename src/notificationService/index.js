import { PushNotificationIOS } from 'react-native'
import PushNotification from 'react-native-push-notification'

const _notifications = []
let _handlerEnabled = true
let _notificationsHandler = (notification) => {}

const _options = {
  onNotification: (notification) => {
    if (notification.userInteraction && _handlerEnabled) {
      _notificationsHandler(notification)
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  popInitialNotification: false,
  requestPermissions: true
}

export const configure = (options) => {
  PushNotification.configure({
    ..._options,
    ...options
  })

  PushNotification.popInitialNotification((notification) => {
    if (notification) { _notifications.push(notification) }
  })
}

export const setNotificationHandler = (notificationHandler) => {
  _notificationsHandler = notificationHandler
}

export const enableHandler = () => {
  _handlerEnabled = true
}

export const disableHandler = () => {
  _handlerEnabled = false
}

export const popInitialNotification = () => {
  return _notifications.shift()
}
