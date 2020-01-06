import React from 'react'
import { View } from 'react-native'
import styles from './styles'

const Background = ({ children }) => (
  <View
    style={styles.background}
  >
    {children}
  </View>
)

export default Background
