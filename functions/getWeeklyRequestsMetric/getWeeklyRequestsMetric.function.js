const admin = require('firebase-admin')
const functions = require('firebase-functions')

const getWeeklyRequestsMetric = functions
  .https
  .onRequest(async (req, res) => {
    try {
      const weeksDocumentSnapshots = await admin.firestore().collection('metric-amount-of-requests').get()
      const weeks = weeksDocumentSnapshots.docs.map(doc => doc.data())

      res.send(weeks)
    } catch (err) {
      res.sendStatus(500)
    }
  })

module.exports = getWeeklyRequestsMetric
