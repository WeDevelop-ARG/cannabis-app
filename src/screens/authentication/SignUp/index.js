import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as AuthenticationService from '~/authenticationService'
import Auth from '../components/Auth'

const SignUp = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  AnalyticsService.setCurrentScreenName('Sign Up')

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    setError(null)
    try {
      await AuthenticationService.emailSignUp(values.credential, values.password)
      NavigationService.navigate('UsernameRequest')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Auth>
      <Auth.Navigation goTo='Login'>Iniciar sesión</Auth.Navigation>
      <Auth.Title>Creá tu cuenta</Auth.Title>
      <Auth.Form
        handleSubmit={handleSubmit}
        error={error}
        authenticating={authenticating}
        credentialText='Ingresá tu email'
        submitText='Registrarme'
        applyValidation
      />
      <Auth.Separator>Creá tu cuenta usando</Auth.Separator>
      <Auth.SocialNetworks />
      <Auth.PrivacyPolicy />
    </Auth>
  )
}

SignUp.navigationOptions = () => ({
  header: null
})

export default SignUp
