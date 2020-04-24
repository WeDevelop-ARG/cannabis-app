import React from 'react'
import { View } from 'react-native'
import { Body } from '~/components'
import styles from './styles'
import check from '~/assets/images/AuthLogo/check.svg'
import { SvgXml } from 'react-native-svg'

const RecoveryEmail = ({ passwordRecoveryEmailSent }) => (
  passwordRecoveryEmailSent && (
    <View style={styles.container}>
      <SvgXml xml={check} style={styles.icon} />
      <Body style={styles.text}>
        ¡Correo de recuperación enviado!
      </Body>
    </View>
  )
)

export default RecoveryEmail
