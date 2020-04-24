import React from 'react'
import { View } from 'react-native'
import NavigationService from '~/navigationService'
import { Body } from '~/components'
import styles from './styles'

const goToSignInScreen = () => {
  NavigationService.navigate('Login', { prevScreen: 'PasswordRecovery' })
}

const BackToSignIn = () => (
  <View>
    <Body
      gray
      style={styles.policyText}
    >
      ¿Te la acordaste? Volvé a {''}
      <Body
        style={styles.text}
        primary
        onPress={goToSignInScreen}
      >
        Inicio de sesión
      </Body>
      .
    </Body>
  </View>
)

export default BackToSignIn
