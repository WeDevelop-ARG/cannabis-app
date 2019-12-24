import * as StorageService from '~/storageService'

export const getURL = async (imageReference) => {
  try {
    return await StorageService.getDownloadURL(imageReference)
  } catch (error) {
    return null
  }
}
