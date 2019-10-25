import GenericAppError from '~/AppErrors/GenericAppError'

class AuthenticationError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'AuthenticationError'
  }
}

export default AuthenticationError
