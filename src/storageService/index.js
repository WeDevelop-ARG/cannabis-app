import * as firebase from 'firebase'
import uuidv4 from 'uuid/v4'
import * as BlobService from '~/blobService'
import * as AuthenticationService from '~/authenticationService'
import StorageError from '~/AppErrors/StorageError'

const mime = 'image/jpg'

export const uploadImageAndReturnReference = async (imageURI, onProgress) => {
  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const metadata = {
      contentType: mime,
      customMetadata: {
        user: currentUserUID
      }
    }

    const blob = await BlobService.buildBlobFromURI(imageURI)
    const uuid = uuidv4()
    const imageRef = firebase.storage().ref('images').child(uuid).put(blob, metadata)
    return new Promise((resolve, reject) => imageRef.on('state_changed', onProgress, reject, () => resolve(uuid)))
  } catch (error) {
    throw new StorageError('Could not upload image.')
  }
}

export const getDownloadURL = async (storageUUID) => {
  try {
    return await firebase.storage().ref(`images/${storageUUID}`).getDownloadURL()
  } catch (error) {
    throw new StorageError('Could not obtain image.')
  }
}
