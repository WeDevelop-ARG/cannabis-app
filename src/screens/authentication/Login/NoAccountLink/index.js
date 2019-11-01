import React from 'react'
import { Text } from 'react-native'
import AppText from '~/helpers/AppText'
import NavigationService from '~/navigationService'
import styles from './styles'

const NoAccountLink = () => (
  <AppText style={styles.noAccountText}>No tenés una cuenta? {' '}
    <Text
      onPress={() => NavigationService.navigate('SignUp')}
      style={styles.underlineText}>
           Registrate
    </Text>
  </AppText>
)

export default NoAccountLink
