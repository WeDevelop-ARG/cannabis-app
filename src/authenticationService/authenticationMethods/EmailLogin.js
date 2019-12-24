import * as firebase from 'firebase'
import AuthenticationError from '~/AppErrors/AuthenticationError'

export default class EmailLogin {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  async authenticate () {
    try {
      return await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  }
}
