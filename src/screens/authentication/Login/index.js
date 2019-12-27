import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import * as AuthenticationService from '~/authenticationService'
import { View } from 'react-native'
import styles from '../styles'
import { isValidEmail } from '../utils'
import Background from '~/helpers/Background'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import GoogleButton from '../SocialNetworks/GoogleButton'
import NoAccountLink from './NoAccountLink'

const initialValues = {
  account: '',
  password: ''
}

const Login = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  AnalyticsService.setCurrentScreenName('Login')

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    setError(null)
    try {
      let email = null
      if (!isValidEmail(values.account)) {
        email = await DatabaseService.queryEmailFromUsername(values.account)
      } else {
        email = values.account
      }
      await AuthenticationService.emailLogin(email, values.password)
      NavigationService.navigate('MainApp')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <NoAccountLink />
        <LoginHeader />
        <LoginForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          error={error}
          authenticating={authenticating}
        />
        <GoogleButton />
      </View>
    </Background>
  )
}

Login.navigationOptions = () => ({
  header: null
})

export default Login
