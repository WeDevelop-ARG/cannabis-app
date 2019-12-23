import * as firebase from 'firebase'
import * as MessagingService from '~/messagingService'
import AuthenticationError from '~/AppErrors/AuthenticationError'
import { GoogleLogin, EmailLogin, EmailSignUp } from './authenticationMethods'

export const getCurrentUserUID = () => {
  try {
    return firebase.auth().currentUser.uid
  } catch (error) {
    throw new AuthenticationError('Not logged in.')
  }
}

export const getCurrentUser = () => {
  try {
    return firebase.auth().currentUser
  } catch (error) {
    throw new AuthenticationError('Not logged in.')
  }
}

const authenticate = async (AuthenticationMethod) => {
  try {
    const firebaseCredential = await AuthenticationMethod.authenticate()
    await MessagingService.enableNotificationsForUser()
    return firebaseCredential
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const emailSignUp = async (email, password) => {
  try {
    return await authenticate(new EmailSignUp(email, password))
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const emailLogin = async (email, password) => {
  try {
    return await authenticate(new EmailLogin(email, password))
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const googleLogin = async () => {
  try {
    return await authenticate(new GoogleLogin())
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}
