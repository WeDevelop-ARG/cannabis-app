import { firebase } from '@react-native-firebase/messaging'
import DatabaseService from '~/databaseService'
import MessagingError from '~/AppErrors/MessagingError'

export const checkForPermissions = async () => {
  const enabled = await firebase.messaging().hasPermission()

  if (!enabled) {
    try {
      await firebase.messaging().requestPermission()
    } catch (error) {
    }
  }
}

const registerTokenRefesh = async () => {
  firebase.messaging().onTokenRefresh(
    async (fcmToken) => {
      try {
        await DatabaseService.storeFCMTokenForCurrentUser(fcmToken)
      } catch (error) {
      }
    }
  )
}

export const saveFCMTokenForCurrentUser = async () => {
  if (await firebase.messaging().hasPermission()) {
    const fcmToken = await firebase.messaging().getToken()

    if (fcmToken) {
      try {
        await DatabaseService.storeFCMTokenForCurrentUser(fcmToken)
        await registerTokenRefesh()
      } catch (error) {
        throw new MessagingError(error.message)
      }
    }
  }
}

export const deleteFCMTokenForCurrentUser = async () => {
  if (await firebase.messaging().hasPermission()) {
    const fcmToken = await firebase.messaging().getToken()

    try {
      await DatabaseService.removeFCMTokenForCurrentUser(fcmToken)
    } catch (error) {
      throw new MessagingError(error.message)
    }
  }
}

export default {
  checkForPermissions,
  saveFCMTokenForCurrentUser,
  deleteFCMTokenForCurrentUser
}
