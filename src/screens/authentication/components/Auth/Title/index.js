import React from 'react'
import { View } from 'react-native'
import { Title } from '~/components'
import styles from './styles'

const AuthTitle = ({ children }) => (
  <View style={styles.container}>
    <Title>{children}</Title>
  </View>
)

export default AuthTitle
