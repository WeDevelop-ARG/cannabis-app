import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import { View } from 'react-native'
import * as firebase from 'firebase'
import styles from '../styles'
import { isValidEmail } from '../utils'
import Background from '../Background'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import NoAccountLink from './NoAccountLink'
import MessagingService from '~/messagingService'

const initialValues = {
  account: '',
  password: ''
}

const LoginEmail = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  AnalyticsService.setCurrentScreenName('LoginEmail')

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

      await firebase.auth().signInWithEmailAndPassword(email, values.password)
      await MessagingService.checkForPermissions()
      await MessagingService.saveFCMTokenForCurrentUser()
      NavigationService.navigate('MainApp')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <LoginHeader />
        <LoginForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          error={error}
          authenticating={authenticating}
        />
        <NoAccountLink />
      </View>
    </Background>
  )
}

LoginEmail.navigationOptions = () => ({
  header: null
})

export default LoginEmail
