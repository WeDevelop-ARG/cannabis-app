const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('../utils/initFirebaseAdmin.js')
const { firebaseTimestampToMoment } = require('../../mixins/date/firebaseTimestampToMoment')
const { getFormattedEndOfWeek } = require('../../mixins/date/getFormattedEndOfWeek')
const { getFormattedStartOfWeek } = require('../../mixins/date/getFormattedStartOfWeek')

initFirebaseAdmin()

const buildRequestCountDocuments = async () => {
  try {
    const weeklyRequestCreation = {}
    const allRequests = admin
      .firestore()
      .collectionGroup('requests')

    const snapshots = await allRequests.get()

    snapshots.docs.forEach((doc) => {
      console.log(`Adding request: ${doc.id} to the count`)

      const data = doc.data()
      const startDate = `${getFormattedStartOfWeek(firebaseTimestampToMoment(data.createdAt))}`
      const endDate = `${getFormattedEndOfWeek(firebaseTimestampToMoment(data.createdAt))}`
      const mapKeyForRequestDate = `${startDate}-${endDate}`

      if (weeklyRequestCreation[mapKeyForRequestDate]) {
        weeklyRequestCreation[mapKeyForRequestDate].amountOfRequests++
      } else {
        weeklyRequestCreation[mapKeyForRequestDate] = {
          startDate,
          endDate,
          amountOfRequests: 1
        }
      }
    })

    await Promise.all(
      Object.entries(weeklyRequestCreation).map(async ([key, data]) => {
        await admin
          .firestore()
          .doc(`metric-amount-of-requests/${data.startDate}_${data.endDate}`)
          .set(data, { merge: true })
      })
    )
  } catch (error) {
    console.error(error.message)
  }
}

buildRequestCountDocuments()
  .then(() => console.log('Script finished successfully!'))
  .catch(console.error.bind(console))
