import React from 'react'
import { View } from 'react-native'
import { Body } from '~/components'
import styles from './styles'

const Header = ({ onExitPress }) => (
  <View style={styles.headerContainer}>
    <Body secondary onPress={onExitPress}>Saltar</Body>
  </View>
)

export default Header
