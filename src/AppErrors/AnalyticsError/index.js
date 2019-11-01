import GenericAppError from '~/AppErrors/GenericAppError'

class AnalyticsError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'AnalyticsError'
  }
}

export default AnalyticsError
