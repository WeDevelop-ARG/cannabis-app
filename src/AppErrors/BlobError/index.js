import GenericAppError from '~/AppErrors/GenericAppError'

class BlobError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'BlobError'
  }
}

export default BlobError
