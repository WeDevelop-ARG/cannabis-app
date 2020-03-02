const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

initFirebaseAdmin()

const bucket = admin.storage().bucket()

const removeImagesNotLinked = async () => {
  const linkedImages = await getAllRequestsImages()
  const storedImages = await getAllStoredImages()
  const imagesToDelete = storedImages.filter(image => !linkedImages.has(image))

  await Promise.all(imagesToDelete.map(removeImage))

  return imagesToDelete
}

const getAllRequestsImages = async () => {
  const imageReferences = new Set()
  const snapshot = await admin.firestore().collectionGroup('requests').get()

  snapshot.docs.forEach(
    (doc) => {
      doc.data().imageReferences.forEach(image => {
        imageReferences.add(image)
      })
    }
  )
  return imageReferences
}

const getAllStoredImages = async () => {
  const storedImagesSnapshot = await bucket.getFiles()
  const storedImagesFiles = storedImagesSnapshot[0]

  return storedImagesFiles.map(image => image.metadata.name.split('/')[1])
}

const removeImage = async (image) => {
  const file = await bucket.file(`images/${image}`)

  if (file.exists()) {
    try {
      await file.delete()
      console.log(`Image (${image}) deleted.`)
    } catch (error) {
      console.log(`Error trying to delete image (${image}). Error: ${error}`)
    }
  }
}

removeImagesNotLinked().then(() => console.log('Script ended successfully'))
