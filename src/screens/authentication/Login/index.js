import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import * as AuthenticationService from '~/authenticationService'
import Auth from '../components/Auth'
import { isValidEmail } from '~/mixins/form/isValidEmail'
import { titlePlacementWithError } from './styles'

const Login = ({ navigation }) => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)
  const passwordRecoveryEmailSent = navigation.getParam('passwordRecoveryEmailSent') || false

  AnalyticsService.setCurrentScreenName('Login')

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    setError(null)
    try {
      let email = null
      if (!isValidEmail(values.credential)) {
        email = await DatabaseService.queryEmailFromUsername(values.credential)
      } else {
        email = values.credential
      }
      await AuthenticationService.emailLogin(email, values.password)
      NavigationService.navigate('MainApp')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Auth>
      <Auth.Navigation goTo='SignUp'>Registrarme</Auth.Navigation>
      <Auth.Logo />
      <Auth.Title style={passwordRecoveryEmailSent ? titlePlacementWithError : {}}>
        Iniciá sesión
      </Auth.Title>
      <Auth.RecoveryEmail passwordRecoveryEmailSent={passwordRecoveryEmailSent} />
      <Auth.Form
        handleSubmit={handleSubmit}
        error={error}
        authenticating={authenticating}
        credentialText='Ingresá tu email o usuario'
        submitText='Ingresar'
      />
      <Auth.ForgotPassword />
      <Auth.Separator>Ingresá usando</Auth.Separator>
      <Auth.SocialNetworks />
    </Auth>
  )
}

Login.navigationOptions = () => ({
  header: null
})

export default Login
