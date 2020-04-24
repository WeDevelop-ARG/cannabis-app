import React, { useState } from 'react'
import EmailForm from './componentes/EmailForm'
import * as firebase from 'firebase'
import { SvgXml } from 'react-native-svg'
import { Title, Description } from '~/components/texts'
import Background from '~/components/Background'
import styles, { ICON_HEIGHT, ICON_WIDTH } from './styles'
import image from '~/assets/images/RecoverPassword/recover.svg'
import GoBackToSignIn from './componentes/GoBackToSignIn'
import NavigationService from '~/navigationService'

const PasswordRecovery = () => {
  const [error, setError] = useState(false)

  const handleSubmit = async (values) => {
    try {
      await firebase.auth().sendPasswordResetEmail(values.email)
      NavigationService.navigate('Login', { passwordRecoveryEmailSent: true })
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Background style={styles.container}>
      <SvgXml width={ICON_WIDTH} height={ICON_HEIGHT} style={styles.image} xml={image} />
      <Title style={styles.title}>
        ¿Olvidaste tu contraseña?
      </Title>
      <Description gray style={styles.text}>
        Ingresá el e-mail que usaste
        para ingresar a Dr. Cannabis y
        te enviaremos las instrucciones
        para recuperarla.
      </Description>
      <EmailForm
        style={styles.form}
        handleSubmit={handleSubmit}
        error={error}
      />
      <GoBackToSignIn />
    </Background>
  )
}

PasswordRecovery.navigationOptions = () => ({
  header: null
})

export default PasswordRecovery
