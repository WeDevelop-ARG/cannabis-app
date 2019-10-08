import 'react-native'
import firebaseConfig from '../src/configs/firebase'

test('checks firebaseConfig is loaded', () => {
  expect(firebaseConfig.length).not.toBe(0)
})
