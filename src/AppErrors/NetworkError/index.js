import GenericAppError from '~/AppErrors/GenericAppError'

class NetworkError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'NetworkError'
  }
}

export default NetworkError
