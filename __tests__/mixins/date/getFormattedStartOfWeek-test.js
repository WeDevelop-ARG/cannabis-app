import 'react-native'
import moment from 'moment'
import { getFormattedStartOfWeek } from '../../../mixins/date/getFormattedStartOfWeek'

describe('formatted start of week date tests', () => {
  test('should return "2020-03-15"', () => {
    const MARCH_15TH_2020 = moment(1584266400000)
    expect(getFormattedStartOfWeek(MARCH_15TH_2020)).toBe('2020-03-15')
  })

  test('should return "2020-01-01"', () => {
    const JANUARY_1ST_2020 = moment(1577847602000)
    expect(getFormattedStartOfWeek(JANUARY_1ST_2020)).toBe('2019-12-29')
  })

  test('should return "2019-12-31"', () => {
    const DECEMBER_31TH_2019 = moment(1577847599000)
    expect(getFormattedStartOfWeek(DECEMBER_31TH_2019)).toBe('2019-12-29')
  })
})
