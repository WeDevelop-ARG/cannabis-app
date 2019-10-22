import GenericAppError from '~/AppErrors/GenericAppError'

class CameraError extends GenericAppError {
  constructor (...params) {
    super(...params)
    this.name = 'CameraError'
  }
}

export default CameraError
