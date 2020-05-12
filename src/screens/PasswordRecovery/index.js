import React, { useState } from 'react'
import * as firebase from 'firebase'
import { SvgXml } from 'react-native-svg'
import NavigationService from '~/navigationService'
import { Title, Description } from '~/components/texts'
import Background from '~/components/Background'
import decorateWithNoConnectionCheckAndNavigation from '~/decorators/decorateWithNoConnectionCheckAndNavigation'
import GoBackToSignIn from './componentes/GoBackToSignIn'
import EmailForm from './componentes/EmailForm'
import image from '~/assets/images/RecoverPassword/recover.svg'
import styles, { ICON_HEIGHT, ICON_WIDTH } from './styles'

const PasswordRecovery = () => {
  const [error, setError] = useState(false)

  const handleSubmit = decorateWithNoConnectionCheckAndNavigation(async (values) => {
    try {
      await firebase.auth().sendPasswordResetEmail(values.email)
      NavigationService.navigate('Login', { passwordRecoveryEmailSent: true })
    } catch (error) {
      setError(error)
    }
  })

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
