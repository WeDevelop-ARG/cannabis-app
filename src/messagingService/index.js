import messaging from '@react-native-firebase/messaging'
import firebase from 'firebase'
import 'firebase/functions'

export const checkForPermissions = async () => {
  const enabled = await messaging().hasPermission()
  if (!enabled) {
    try {
      await messaging().requestPermission()
    } catch (error) {
    }
  }
}

export const saveFCMTokenForCurrentUser = async () => {
  if (messaging().hasPermission()) {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      try {
        const storeFCMTokenInUserGroup = firebase.functions().httpsCallable('storeFCMTokenInUserGroup')
        await storeFCMTokenInUserGroup({ fcmToken: fcmToken })
      } catch (error) {
      }
    }
  }
}

export const deleteFCMTokenForCurrentUser = async () => {
  if (await messaging().hasPermission()) {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      try {
        const removeFCMTokenInUserGroup = firebase.functions().httpsCallable('removeFCMTokenInUserGroup')
        await removeFCMTokenInUserGroup({ fcmToken: fcmToken })
      } catch (error) {
      }
    }
  }
}

export default {
  checkForPermissions,
  saveFCMTokenForCurrentUser,
  deleteFCMTokenForCurrentUser
}
