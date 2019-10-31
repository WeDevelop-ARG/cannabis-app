import * as firebase from 'firebase'

const getDownloadURL = async (storageUUID) => {
  try {
    return await firebase.storage().ref(`images/${storageUUID}`).getDownloadURL()
  } catch (error) {
    console.log(error.message)
  }
}

export const getDownloadURLFromImages = async (imageReferences) => (
  imageReferences.reduce(
    async (imageSources, imageStorageUUID) => {
      imageSources = await imageSources
      const diagnose = await getDownloadURL(imageStorageUUID)
      imageSources.push(diagnose)

      return imageSources
    },
    Promise.resolve([])
  )
)
