const moment = require('moment')

const firebaseTimestampToMoment = (timestamp) => moment(timestamp.seconds * 1000)

module.exports.firebaseTimestampToMoment = firebaseTimestampToMoment
