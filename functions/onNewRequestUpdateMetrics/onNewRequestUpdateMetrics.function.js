const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment')

const onNewRequestUpdateMetrics = functions
  .firestore
  .document('users/{userUID}/requests/{requestUID}')
  .onCreate((snapshot, context) => {
    const currentMoment = moment()
    const startDate = currentMoment.startOf('week').format('YYYY-MM-DD')
    const endDate = currentMoment.endOf('week').format('YYYY-MM-DD')

    admin
      .firestore()
      .doc(`metric-amount-of-requests/${startDate}_${endDate}`)
      .set({
        startDate,
        endDate,
        amountOfRequests: admin.firestore.FieldValue.increment(1)
      }, { merge: true })
  })

module.exports = onNewRequestUpdateMetrics
