import React from 'react'
import { Text } from '~/components'
import NavigationService from '~/navigationService'
import styles from './styles'

const AccountLink = () => (
  <Text style={styles.accountText}>Ya tenés una cuenta? {' '}
    <Text
      onPress={() => NavigationService.navigate('Login')}
      style={styles.underlineText}>
           Iniciá sesión
    </Text>
  </Text>
)

export default AccountLink
