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
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
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

export default {
  configure,
  setNotificationHandler,
  enableHandler,
  disableHandler,
  popInitialNotification
}
