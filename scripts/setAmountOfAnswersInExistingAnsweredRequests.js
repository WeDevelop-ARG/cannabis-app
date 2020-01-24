const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

initFirebaseAdmin()

const setAmountOfAnswersInExistingAnsweredRequests = async () => {
  try {
    const answeredRequests = admin
      .firestore()
      .collectionGroup('requests')

    const snapshots = await answeredRequests.get()

    await Promise.all(
      snapshots.docs.map(async (doc) => {
        console.log(`Setting amount of answers for ${doc.id}`)
        const { answered, ...data } = doc.data()

        if (answered) {
          const responses = await admin
            .firestore()
            .collection(`users/${doc.ref.parent.parent.id}/requests/${doc.id}/responses`)
            .get()

          await doc.ref.update({
            amountOfAnswers: responses.docs.length
          })
        } else {
          await doc.ref.update({
            amountOfAnswers: 0
          })
        }
      })
    )
  } catch (error) {
    console.error(error.message)
  }
}

setAmountOfAnswersInExistingAnsweredRequests()
  .then()
  .catch(console.error.bind(console))
