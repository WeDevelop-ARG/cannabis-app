import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import { View } from 'react-native'
import * as firebase from 'firebase'
import * as Yup from 'yup'
import styles from '../styles'
import AccountLink from './AccountLink'
import Background from '~/helpers/Background'
import SignUpHeader from './SignUpHeader'
import SignUpForm from './SignUpForm'

const initialValues = {
  username: '',
  email: '',
  password: ''
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Requerido'),
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
      if (await DatabaseService.usernameAlreadyInUse(values.username)) {
        throw new Error('Nombre de usuario no válido')
      }

      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      const user = userCredentials.user

      await user.updateProfile({
        displayName: values.username
      })

      const newUserUID = user.uid
      const newUserData = {
        email: values.email,
        username: values.username
      }

      await DatabaseService.addNewUserData(newUserUID, newUserData)
      NavigationService.navigate('MainApp')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <SignUpHeader />
        <SignUpForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          schema={schema}
          error={error}
          authenticating={authenticating}
        />
        <AccountLink />
      </View>
    </Background>
  )
}

SignUp.navigationOptions = () => ({
  header: null
})

export default SignUp
