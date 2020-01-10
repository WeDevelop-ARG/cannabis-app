import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '~/constants'

const VerticalSeparator = ({ style }) => (
  <View style={[styles.verticalLine, style]} />
)

const styles = StyleSheet.create({
  verticalLine: {
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray2,
    height: '65%'
  }
})

export default VerticalSeparator
