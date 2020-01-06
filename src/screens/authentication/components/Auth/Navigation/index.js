import React from 'react'
import { View } from 'react-native'
import NavigationService from '~/navigationService'
import { Description } from '~/components'
import styles from './styles'

const Navigation = ({ goTo, children }) => (
  <View style={styles.container}>
    <Description
      secondary
      onPress={() => NavigationService.navigate(goTo)}
    >
      {children}
    </Description>
  </View>
)

export default Navigation
