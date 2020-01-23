const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

initFirebaseAdmin()

const setAmountOfAnswersInExistingAnsweredRequests = async () => {
  try {
    const answeredRequests = admin
      .firestore()
      .collectionGroup('requests')
      .where('answered', '==', true)

    const snapshots = await answeredRequests.get()

    await Promise.all(
      snapshots.docs.map(async (doc) => {
        console.log(`Setting amount of answers for ${doc.id}`)
        await doc.ref.update({
          amountOfAnswers: 1
        })
      })
    )
  } catch (error) {
    console.error(error.message)
  }
}

setAmountOfAnswersInExistingAnsweredRequests()
  .then()
  .catch(console.error.bind(console))
