import React from 'react'
import { Image } from 'react-native'
import { Text } from '~/components'
import loginIcon from '~/assets/images/Authentication/loginIcon.png'
import styles from './styles'

const LoginHeader = () => (
  <>
    <Image
      style={styles.loginImage}
      source={loginIcon}
    />
    <Text fontVariant='description' style={styles.loginText}> Iniciar Sesión</Text>
  </>
)

export default LoginHeader
