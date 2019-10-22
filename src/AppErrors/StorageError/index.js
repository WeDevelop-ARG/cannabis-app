import GenericAppError from '~/AppErrors/GenericAppError'

class StorageError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'StorageError'
  }
}

export default StorageError
