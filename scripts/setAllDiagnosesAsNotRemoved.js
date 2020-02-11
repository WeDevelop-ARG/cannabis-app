const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

initFirebaseAdmin()

const setAllDiagnosesAsNotRemoved = async () => {
  try {
    const requests = admin
      .firestore()
      .collectionGroup('requests')

    const snapshots = await requests.get()

    await Promise.all(
      snapshots.docs.map(async (doc) => {
        console.log(`Setting ${doc.id} as not removed`)

        await doc.ref.update({ removedAt: 0 })
      })
    )
  } catch (error) {
    console.error(error.message)
  }
}

setAllDiagnosesAsNotRemoved()
  .then()
  .catch(console.error.bind(console))
