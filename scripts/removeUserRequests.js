const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

if (process.argv.length !== 3) {
  console.error('Invalid number of params')
  console.log('Usage: node removeUserRequests.js <email>')
  process.exit(1)
}

const mail = process.argv[2]

initFirebaseAdmin()

const bucket = admin.storage().bucket()

const asyncForEach = async (iterable, asyncCallback) => {
  for (let i = 0; i < iterable.length; i++) {
    await asyncCallback(iterable[i])
  }
}

const getUserDiagnosesIDs = async (userUID) => {
  console.log('Retrieving user\'s diagnoses uids.')
  const docSnap = await admin.firestore().collection('users').doc(userUID).get()
  return docSnap.data().diagnoses
}

const getDiagnoseImages = async (diagnoseUID) => {
  console.log('Retrieving diagnose\'s images\' uids.')
  const docSnap = await admin.firestore().collection('diagnoses').doc(diagnoseUID).get()
  return docSnap.data().imageReferences
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

const removeDiagnoseImages = async (diagnoseUID) => {
  try {
    const images = await getDiagnoseImages(diagnoseUID)
    console.log('Removing diagnose\'s images from storage')
    await asyncForEach(images, removeImage)
  } catch (error) {
    console.log(error)
  }
}

const removeDiagnoseEntry = async (diagnoseUID) => {
  console.log('Removing diagnose\'s database entry')
  await admin.firestore().collection('diagnoses').doc(diagnoseUID).delete()
}

const removeDiagnose = async (diagnoseUID) => {
  console.log(`Removing diagnose: ${diagnoseUID}.`)
  try {
    await removeDiagnoseImages(diagnoseUID)
    await removeDiagnoseEntry(diagnoseUID)
  } catch (error) {
    console.log(error)
  }
}

const removeRequest = async (doc) => {
  console.log(`Remove diagnose's responses collection`)
  try {
    const snap = doc.collection('responses').listDocuments()
    await asyncForEach(snap, async doc => doc.delete())
    await doc.delete()
  } catch (error) {
    console.log(`Error during document deletion. Error: ${error}`)
  }
}

const removeRequestsCollection = async (userUID) => {
  console.log(`Remove requests collection for user (${userUID})`)
  try {
    const snap = await admin.firestore().collection(`users/${userUID}/requests`).listDocuments()
    await asyncForEach(snap, async doc => removeRequest(doc))
    await admin.firestore().collection('users').doc(userUID).update({ diagnoses: [] })
  } catch (error) {
    console.log(error)
  }
}

const removeUserRequests = async (user) => {
  console.log(`Remove requests script started for user: ${user.uid}`)
  const diagnoses = await getUserDiagnosesIDs(user.uid)

  await asyncForEach(diagnoses, removeDiagnose)
  await removeRequestsCollection(user.uid)

  process.exit(0)
}

admin.auth().getUserByEmail(mail)
  .then(removeUserRequests)
  .catch(console.error.bind(console))
