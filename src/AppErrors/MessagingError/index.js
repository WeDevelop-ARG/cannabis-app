import GenericAppError from '~/AppErrors/GenericAppError'

class MessagingError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'MessagingError'
  }
}

export default MessagingError
