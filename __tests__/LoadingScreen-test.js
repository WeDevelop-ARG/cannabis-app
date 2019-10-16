import 'react-native'
import React from 'react'
import LoadingScreen from '../src/screens/LoadingScreen'
import * as firebase from 'firebase'
import firebaseConfig from '~/configs/firebase'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

beforeAll(() => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
})

it('renders correctly', () => {
  renderer.create(<LoadingScreen />)
})
