import messaging from '@react-native-firebase/messaging'
import firebase from 'firebase'
import 'firebase/functions'
import MessagingError from '~/AppErrors/MessagingError'
import * as CacheService from '~/cacheService'

export const checkForPermissions = async () => {
  const enabled = await messaging().hasPermission()

  if (!enabled) {
    try {
      await messaging().requestPermission()
    } catch (error) {
      throw new MessagingError(error.message)
    }
  }
}

export const saveFCMTokenForCurrentUser = async () => {
  if (messaging().hasPermission()) {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      try {
        await CacheService.setItem('fcmToken', fcmToken)
        const storeFCMTokenInUserGroup = firebase.functions().httpsCallable('storeFCMTokenInUserGroup')

        await storeFCMTokenInUserGroup({ fcmToken: fcmToken })
      } catch (error) {
        throw new MessagingError(error.message)
      }
    }
  }
}

export const deleteFCMTokenForCurrentUser = async () => {
  let fcmToken

  try {
    fcmToken = await CacheService.getItem('fcmToken')

    await CacheService.removeItem('fcmToken')
  } catch (error) {
    fcmToken = null
  }

  if (fcmToken) {
    try {
      const removeFCMTokenInUserGroup = firebase.functions().httpsCallable('removeFCMTokenInUserGroup')
      
      await removeFCMTokenInUserGroup({ fcmToken: fcmToken })
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
