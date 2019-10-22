import * as firebase from 'firebase'
import AuthenticationError from '~/AppErrors/AuthenticationError'

export const getCurrentUserUID = () => {
  try {
    return firebase.auth().currentUser.uid
  } catch (error) {
    throw new AuthenticationError('Not logged in.')
  }
}
