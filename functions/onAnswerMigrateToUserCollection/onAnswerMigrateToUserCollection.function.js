const admin = require('firebase-admin')
const functions = require('firebase-functions')

const onAnswerMigrateToUserCollection = functions
  .firestore
  .document('diagnoses/{diagnoseId}')
  .onUpdate(async (snapshot, context) => {
    try {
      const dataBefore = snapshot.before.data()
      const dataAfter = snapshot.after.data()

      if (!dataBefore.answered && dataAfter.answered) {
        const answer = {
          answer: dataAfter.answer || '',
          answeredBy: dataAfter.answeredBy || '',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        }
        const diagnoseId = snapshot.after.id
        await admin.firestore().collection(`users/${dataBefore.user}/requests/${diagnoseId}/responses`).add(answer)
        await admin.firestore().doc(`users/${dataBefore.user}/requests/${diagnoseId}`).update({
          answered: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  })

module.exports = onAnswerMigrateToUserCollection
