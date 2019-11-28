import * as firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin'
import AuthenticationError from '~/AppErrors/AuthenticationError'
import googleConfig from '~/configs/google'

export const getCurrentUserUID = () => {
  try {
    return firebase.auth().currentUser.uid
  } catch (error) {
    throw new AuthenticationError('Not logged in.')
  }
}

export const getGoogleSignInData = async () => {
  try {
    await GoogleSignin.configure({
      webClientId: googleConfig.webClientId
    })
    const googleSignInData = await GoogleSignin.signIn()

    return googleSignInData
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const loginWithGoogleSignInData = async (googleSignInData) => {
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(googleSignInData.idToken, googleSignInData.accessToken)
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

    return firebaseUserCredential
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const emailAlreadyHasGoogleSignIn = async (email) => {
  try {
    const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email)

    return signInMethods.indexOf('google.com') !== -1
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const googleLogin = async () => {
  try {
    const googleSignInData = await getGoogleSignInData()
    const credential = firebase.auth.GoogleAuthProvider.credential(googleSignInData.idToken, googleSignInData.accessToken)
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

    return firebaseUserCredential
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}
