import GenericAppError from '~/AppErrors/GenericAppError'

class DatabaseError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'DatabaseError'
  }
}

export default DatabaseError
