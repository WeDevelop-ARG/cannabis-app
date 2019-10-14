import React from 'react'
import { Text } from 'react-native'

const consistentTextStyle = {
  fontFamily: 'roboto',
  fontSize: 14
}

const AppText = ({ style, children }) => (
  <Text style={[consistentTextStyle, style]}>
    {children}
  </Text>
)

export default AppText
