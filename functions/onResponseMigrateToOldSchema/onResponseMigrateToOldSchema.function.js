const admin = require('firebase-admin')
const functions = require('firebase-functions')

const onResponseMigrateToOldSchema = functions
  .firestore
  .document('users/{userUID}/requests/{diagnoseUID}/responses/{responseUID}')
  .onCreate(async (snapshot, context) => {
    try {
      const diagnoseUID = context.params.diagnoseUID
      const data = snapshot.data()

      const oldData = await admin.firestore().doc(`diagnoses/${diagnoseUID}`).get()

      if (oldData.data().answered) return

      const dataToUpload = {
        answer: data.answer,
        answeredBy: data.answeredBy,
        answeredByUID: data.answeredByUID,
        answered: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }

      await admin.firestore().doc(`diagnoses/${diagnoseUID}`).update(dataToUpload)
    } catch (error) {
      console.log(error.message)
    }
  })

module.exports = onResponseMigrateToOldSchema
