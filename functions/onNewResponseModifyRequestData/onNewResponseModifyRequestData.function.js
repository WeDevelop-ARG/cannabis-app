const admin = require('firebase-admin')
const functions = require('firebase-functions')

const onNewResponseModifyRequestData = functions
  .firestore
  .document('users/{userUID}/requests/{diagnoseUID}/responses/{responseUID}')
  .onCreate(async (snapshot, context) => {
    const diagnoseRef = snapshot.ref.parent.parent
    const diagnoseSnapshot = await diagnoseRef.get()
    const { amountOfAnswers, ...data } = diagnoseSnapshot.data()

    const responseData = snapshot.data()
    const isLastCommentAdmin = Boolean(responseData.answeredBy)

    if (amountOfAnswers) {
      diagnoseRef.update({
        amountOfAnswers: admin.firestore.FieldValue.increment(1),
        isLastCommentAdmin,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
    } else {
      diagnoseRef.update({
        amountOfAnswers: 1,
        isLastCommentAdmin,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }
  })

module.exports = onNewResponseModifyRequestData
