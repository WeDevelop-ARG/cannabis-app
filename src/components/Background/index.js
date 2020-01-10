import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '~/constants'

const Background = ({ style, children }) => {
  return (
    <View style={[styles.background, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
})

export default Background
