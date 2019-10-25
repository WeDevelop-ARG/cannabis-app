import ImagePicker from 'react-native-image-picker'
import CameraError from '~/AppErrors/CameraError'

const options = {
  mediaType: 'photo',
  title: 'Seleccionar una foto',
  takePhotoButtonTitle: 'Tomar una foto',
  chooseFromLibraryButtonTitle: 'Seleccionar desde galería',
  cancelButtonTitle: 'cancelar',
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'CannabisDiagnose',
    cameraRoll: false
  }
}

const showImagePickerPromiseWrapper = (options) => (
  new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, (imageResponse) => {
      if (!imageResponse.uri) {
        reject(new CameraError('Image not taken nor selected.'))
      } else {
        resolve(buildImageRepresentation(imageResponse))
      }
    })
  })
)

const buildImageRepresentation = (thirdPartyImageObject) => (
  {
    uri: thirdPartyImageObject.uri,
    filename: thirdPartyImageObject.fileName
  }
)

export const selectImageFromGalleryOrCamera = () => showImagePickerPromiseWrapper(options)
export const getFilenameFromImage = (image) => image.filename
export const getURIFromImage = (image) => image.uri
