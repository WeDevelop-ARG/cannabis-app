import moment from 'moment'

export const firebaseTimestampToMoment = (timestamp) => {
  return moment(timestamp.seconds * 1000)
}
