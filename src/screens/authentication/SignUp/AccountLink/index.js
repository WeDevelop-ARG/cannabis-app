import React from 'react'
import { Text } from '~/components'
import NavigationService from '~/navigationService'
import styles from './styles'

const AccountLink = () => (
  <Text style={styles.accountText}>
    <Text
      onPress={() => NavigationService.navigate('Login')}
      style={styles.underlineText}>
           Iniciar sesión
    </Text>
  </Text>
)

export default AccountLink
