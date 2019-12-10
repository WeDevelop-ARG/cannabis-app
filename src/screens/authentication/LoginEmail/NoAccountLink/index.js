import React from 'react'
import { Text } from '~/components'
import NavigationService from '~/navigationService'
import styles from './styles'

const NoAccountLink = () => (
  <Text style={styles.noAccountText}>No tenés una cuenta? {' '}
    <Text
      onPress={() => NavigationService.navigate('SignUp')}
      style={styles.underlineText}>
           Registrate
    </Text>
  </Text>
)

export default NoAccountLink
