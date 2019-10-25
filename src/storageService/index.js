import * as firebase from 'firebase'
import uuidv4 from 'uuid/v4'
import * as BlobService from '~/blobService'
import * as AuthenticationService from '~/authenticationService'
import StorageError from '~/AppErrors/StorageError'

const mime = 'image/jpg'

export const uploadImageAndReturnReference = async (imageURI) => {
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
    const imageRef = firebase.storage().ref('images').child(uuid)
    await imageRef.put(blob, metadata)

    return uuid
  } catch (error) {
    throw new StorageError('Could not upload image.')
  }
}
