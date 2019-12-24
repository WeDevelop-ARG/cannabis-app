import React from 'react'
import { Text } from '~/components'
import NavigationService from '~/navigationService'
import styles from './styles'

const NoAccountLink = () => (
  <Text style={styles.noAccountText}>
    <Text
      onPress={() => NavigationService.navigate('SignUp')}
      style={styles.underlineText}>
           Registrarme
    </Text>
  </Text>
)

export default NoAccountLink
