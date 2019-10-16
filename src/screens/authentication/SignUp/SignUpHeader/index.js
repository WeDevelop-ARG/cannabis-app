import React from 'react'
import { Image } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'

const SignUpHeader = () => (
  <>
    <Image
      style={styles.signUpImage}
      source={require('~/screens/authentication/resources/signUpIconWhite.png')}
    />
    <AppText style={styles.signUpText}> Crear cuenta</AppText>
  </>
)

export default SignUpHeader
