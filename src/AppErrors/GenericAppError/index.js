class GenericAppError extends Error {
  constructor (...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GenericAppError)
    }

    this.name = 'GenericAppError'
  }

  logError () {
    console.log(`${this.stack}`)
  }
}

export default GenericAppError
