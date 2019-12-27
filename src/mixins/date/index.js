import moment from 'moment'

export const firebaseTimestampToMoment = (timestamp) => (
  moment(timestamp.seconds * 1000)
)
