import React, { useState } from 'react'
import NavigationService from '~/navigationService'
import { ImageBackground, Text, View, Image, TextInput, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import { Formik } from 'formik'
import AppText from '~/helpers/AppText'
import styles from '../styles'

const Error = ({ error }) => (
  error && <AppText style={[styles.whiteText, { textAlign: 'center' }]}>
  El email y contraseña ingresados no coinciden con nuestros registros.
  </AppText>
)

const Authenticating = ({ authenticating }) => (
  authenticating && <ActivityIndicator />
)

const initialValues = {
  email: '',
  password: ''
}

const Login = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    setError(null)
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      NavigationService.navigate('Home')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../resources/background.jpg')}
    >
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require('../resources/whiteKey.png')}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <KeyboardAvoidingView style={styles.loginForm}>
              <AppText style={[styles.whiteText, { fontSize: 18 }]}> Iniciar Sesión</AppText>
              <TextInput
                style={styles.label}
                placeholder='email@ejemplo.com'
                placeholderTextColor='white'
                onChangeText={formikProps.handleChange('email')}
                value={formikProps.values.email}
              />
              <TextInput
                style={styles.label}
                placeholder='contraseña'
                placeholderTextColor='white'
                secureTextEntry
                onChangeText={formikProps.handleChange('password')}
                value={formikProps.values.password}
              />
              <Error error={error} />
              <Authenticating authenticating={authenticating} />
              <TouchableHighlight
                style={styles.loginButton}
                onPress={formikProps.handleSubmit}
              >
                <AppText style={styles.whiteText}>
                  Ingresar
                </AppText>
              </TouchableHighlight>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <AppText style={[styles.whiteText, styles.doesntHaveAccount]}>No tenes una cuenta? {' '}
          <Text
            onPress={() => NavigationService.navigate('SignUp')}
            style={styles.underlineText}>
           Registrate
          </Text>
        </AppText>
      </View>
    </ImageBackground>
  )
}

Login.navigationOptions = () => ({
  header: null
})

export default Login
