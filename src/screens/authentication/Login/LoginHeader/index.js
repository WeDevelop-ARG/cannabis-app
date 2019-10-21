import React from 'react'
import { Image } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'

const LoginHeader = () => (
  <>
    <Image
      style={styles.loginImage}
      source={require('~/screens/authentication/resources/whiteKey.png')}
    />
    <AppText style={styles.loginText}> Iniciar Sesión</AppText>
  </>
)

export default LoginHeader
