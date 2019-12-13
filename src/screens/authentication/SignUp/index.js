import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as AuthenticationService from '~/authenticationService'
import { View } from 'react-native'
import * as Yup from 'yup'
import styles from '../styles'
import AccountLink from './AccountLink'
import Background from '~/helpers/Background'
import SignUpHeader from './SignUpHeader'
import SignUpForm from './SignUpForm'
import GoogleButton from '../SocialNetworks/GoogleButton'
import PrivacyPolicyText from './PrivacyPolicyText'

const initialValues = {
  email: '',
  password: ''
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Contraseña muy corta')
    .required('Requerido')
})

const SignUp = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  AnalyticsService.setCurrentScreenName('Sign Up')

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    setError(null)
    try {
      await AuthenticationService.emailSignUp(values.email, values.password)
      NavigationService.navigate('UsernameRequest')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <AccountLink />
        <SignUpHeader />
        <SignUpForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          schema={schema}
          error={error}
          authenticating={authenticating}
        />
        <GoogleButton />
        <PrivacyPolicyText />
      </View>
    </Background>
  )
}

SignUp.navigationOptions = () => ({
  header: null
})

export default SignUp
