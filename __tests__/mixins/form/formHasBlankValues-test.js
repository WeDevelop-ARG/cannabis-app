import 'react-native'
import { formHasBlankValues } from '../../../src//mixins/form/formHasBlankValues'

describe('form has blank values tests', () => {
  test('unfilled obj should return true', () => {
    expect(formHasBlankValues({ prop: '' })).toBe(true)
  })

  test('filled obj should return false', () => {
    expect(formHasBlankValues({ prop: 'filled' })).toBe(false)
  })

  test('empty obj should return false', () => {
    expect(formHasBlankValues({})).toBe(false)
  })

  test('at least one blank prop in object should return true', () => {
    expect(formHasBlankValues({ prop: 'filled', propB: '' })).toBe(true)
  })
})
