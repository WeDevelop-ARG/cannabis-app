import 'react-native'
import moment from 'moment'
import { getFormattedEndOfWeek } from '../../../mixins/date/getFormattedEndOfWeek'

describe('formatted end of week date tests', () => {
  test('should return "2020-03-22"', () => {
    const MARCH_19TH_2020 = moment(1584586800000)
    expect(getFormattedEndOfWeek(MARCH_19TH_2020)).toBe('2020-03-21')
  })

  test('should return "2020-03-14"', () => {
    const MARCH_9TH_2020 = moment(1583767128000)
    expect(getFormattedEndOfWeek(MARCH_9TH_2020)).toBe('2020-03-14')
  })
})
