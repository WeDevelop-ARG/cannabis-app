import React from 'react'
import { View } from 'react-native'
import NavigationService from '~/navigationService'
import { Body } from '~/components'
import styles from './styles.js'

const goToResetPasswordScreen = () => {
  NavigationService.navigate('PasswordRecovery', { prevScreen: 'LogIn' })
}

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Body
        style={styles.text}
        primary
        onPress={goToResetPasswordScreen}
      >
        ¿Olvidaste tu contraseña?
      </Body>
    </View>
  )
}

export default ForgotPassword
