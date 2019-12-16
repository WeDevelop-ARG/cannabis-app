import React from 'react'
import { Image } from 'react-native'
import { Text } from '~/components'
import signUpIcon from '~/assets/images/Authentication/signUpIcon.png'
import styles from './styles'

const SignUpHeader = () => (
  <>
    <Image
      style={styles.signUpImage}
      source={signUpIcon}
    />
    <Text fontVariant='description' style={styles.signUpText}> Crear cuenta</Text>
  </>
)

export default SignUpHeader
