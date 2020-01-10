import React from 'react'
import { View } from 'react-native'
import { Title, Subheader } from '~/components/texts'
import styles from './styles'

const Header = ({ isScrolling, title = 'Mis Consultas' }) => (
  <View style={styles.headerContainer}>
    {isScrolling ? (
      <View style={styles.headerWhileScrolling}>
        <Subheader>{title}</Subheader>
      </View>
    ) : (
      <Title style={styles.headerWhileStatic}>{title}</Title>
    )}
  </View>
)

export default Header
