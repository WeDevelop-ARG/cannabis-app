import React from 'react'
import { View } from 'react-native'
import { Title } from '~/components'
import { verticalScale } from 'react-native-size-matters/extend'

const defaultStyle = {
  marginTop: verticalScale(24),
  marginBottom: verticalScale(50)
}

const AuthTitle = ({ children, style }) => (
  <View style={[defaultStyle, style]}>
    <Title>{children}</Title>
  </View>
)

export default AuthTitle
