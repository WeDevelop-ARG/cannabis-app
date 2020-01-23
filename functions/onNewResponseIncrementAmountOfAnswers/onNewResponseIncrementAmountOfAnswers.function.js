const admin = require('firebase-admin')
const functions = require('firebase-functions')

const onNewResponseIncrementAmountOfAnswers = functions
  .firestore
  .document('users/{userUID}/requests/{diagnoseUID}/responses/{responseUID}')
  .onCreate(async (snapshot, context) => {
    const diagnoseRef = snapshot.ref.parent.parent
    const diagnoseSnapshot = await diagnoseRef.get()
    const { amountOfAnswers, ...data } = diagnoseSnapshot.data()

    if (amountOfAnswers) {
      diagnoseRef.update({
        amountOfAnswers: admin.firestore.FieldValue.increment(1)
      })
    } else {
      diagnoseRef.update({
        amountOfAnswers: 1
      })
    }
  })

module.exports = onNewResponseIncrementAmountOfAnswers
