import React from 'react'
import { Text } from 'react-native'
import AppText from '~/helpers/AppText'
import NavigationService from '~/navigationService'
import styles from './styles'

const AccountLink = () => (
  <AppText style={styles.accountText}>Ya tenés una cuenta? {' '}
    <Text
      onPress={() => NavigationService.navigate('Login')}
      style={styles.underlineText}>
           Iniciá sesión
    </Text>
  </AppText>
)

export default AccountLink
