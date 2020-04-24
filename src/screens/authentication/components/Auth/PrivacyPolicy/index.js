import React from 'react'
import { View } from 'react-native'
import NavigationService from '~/navigationService'
import { Body } from '~/components'
import styles from './styles'

const goToPrivacyPolicyScreen = () => {
  NavigationService.navigate('PrivacyPolicy', { prevScreen: 'SignUp' })
}

const PrivacyPolicy = () => (
  <View style={styles.container}>
    <Body
      gray
      style={styles.policyText}
    > Al registrarte estás aceptando nuestra{' '}
      <Body
        primary
        onPress={goToPrivacyPolicyScreen}
      >
            Politica de privacidad
      </Body>
      .
    </Body>
  </View>
)

export default PrivacyPolicy
