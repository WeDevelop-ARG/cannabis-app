import CameraError from '~/AppErrors/CameraError'
import ImagePicker from 'react-native-image-crop-picker'

const callPickerAction = async (action, options) => {
  try {
    let images = await ImagePicker[action]({
      mediaType: 'photo',
      multiple: true,
      ...options
    })

    if (!Array.isArray(images)) images = [images]

    return images.map(img => img.path)
  } catch (error) {
    clean()
    throw new CameraError(error.message)
  }
}

export const clean = async () => {
  try {
    await ImagePicker.clean()
  } catch (error) {
    throw new CameraError(error.message)
  }
}

export const openCamera = async (options) => {
  return callPickerAction('openCamera', { multiple: false, ...options })
}

export const openGallery = async (options) => {
  return callPickerAction('openPicker', options)
}
