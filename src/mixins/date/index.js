import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/es'

export const firebaseTimestampToMoment = (timestamp, locale = 'es') => {
  moment.locale(locale)
  return moment(timestamp.seconds * 1000)
}
