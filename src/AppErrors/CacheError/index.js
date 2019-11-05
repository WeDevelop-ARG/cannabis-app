import GenericAppError from '~/AppErrors/GenericAppError'

class CacheError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'CacheError'
  }
}

export default CacheError
