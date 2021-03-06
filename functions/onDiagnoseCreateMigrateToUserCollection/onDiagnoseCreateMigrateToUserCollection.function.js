const admin = require('firebase-admin')
const functions = require('firebase-functions')

const onDiagnoseCreateMigrateToUserCollection = functions
  .firestore
  .document('diagnoses/{diagnoseId}')
  .onCreate(async (snapshot, context) => {
    try {
      const data = snapshot.data()
      const { user, ...dataWithoutUser } = data
      const diagnoseId = snapshot.id
      const dataToUpload = {
        ...dataWithoutUser,
        removedAt: 0,
        isSolved: false,
        amountOfAnswers: 0
      }

      await admin.firestore().doc(`users/${data.user}/requests/${diagnoseId}`).set(dataToUpload)
    } catch (error) {
      console.log(error.message)
    }
  })

module.exports = onDiagnoseCreateMigrateToUserCollection
