import * as firebase from 'firebase'
import AuthenticationError from '~/AppErrors/AuthenticationError'

export default class EmailSignUp {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  async authenticate () {
    try {
      return await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  }
}
