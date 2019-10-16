import React from 'react'
import { KeyboardAvoidingView, TextInput, TouchableHighlight } from 'react-native'
import { Formik } from 'formik'
import AppText from '~/helpers/AppText'
import AuthenticatingIndicator from '~/screens/authentication/AuthenticatingIndicator'
import styles from './styles'

const Error = ({ error }) => (
  error && <AppText style={styles.loginError}>
  Las credenciales ingresadas no coinciden con nuestros registros.
  </AppText>
)

const LoginButton = ({ onPress }) => (
  <TouchableHighlight
    style={styles.loginButton}
    onPress={onPress}
  >
    <AppText style={styles.loginText}>
       Ingresar
    </AppText>
  </TouchableHighlight>
)

const LoginForm = ({ initialValues, handleSubmit, error, authenticating }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
    {formikProps => (
      <KeyboardAvoidingView style={styles.loginForm}>
        <TextInput
          style={styles.label}
          placeholder='Nombre de usuario o email'
          placeholderTextColor='white'
          onChangeText={formikProps.handleChange('account')}
          value={formikProps.values.account}
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
        <AuthenticatingIndicator authenticating={authenticating} />
        <LoginButton onPress={formikProps.handleSubmit} />
      </KeyboardAvoidingView>
    )}
  </Formik>
)

export default LoginForm
