import * as firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin'
import AuthenticationError from '~/AppErrors/AuthenticationError'
import googleConfig from '~/configs/google'

export default class GoogleSignIn {
  async authenticate () {
    try {
      await GoogleSignin.configure({
        webClientId: googleConfig.webClientId
      })
      const googleSignInData = await GoogleSignin.signIn()
      const credential = firebase.auth.GoogleAuthProvider.credential(googleSignInData.idToken, googleSignInData.accessToken)
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

      return firebaseUserCredential
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  }
}
