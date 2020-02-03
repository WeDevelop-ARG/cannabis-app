import React from 'react'
import { View } from 'react-native'
import { Title } from '~/components/texts'
import styles from './styles'

const StaticHeader = ({ title = 'Mis Consultas' }) => (
  <View style={styles.headerContainer}>
    <Title style={styles.headerWhileStatic}>{title}</Title>
  </View>
)

export default StaticHeader
