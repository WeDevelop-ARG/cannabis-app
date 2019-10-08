import 'react-native'
import React from 'react'
import AppText from '../src/helpers/AppText'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<AppText />)
})

it('renders correctly', () => {
  renderer.create(<AppText>text</AppText>)
})
