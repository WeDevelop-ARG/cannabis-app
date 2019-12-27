import React from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Formik } from 'formik'
import { Text, Button } from '~/components'
import AuthenticatingIndicator from '~/screens/authentication/AuthenticatingIndicator'
import styles from './styles'

const Error = ({ error }) => (
  error && <Text style={styles.loginError}>
  Las credenciales ingresadas no coinciden con nuestros registros.
  </Text>
)

const LoginButton = ({ onPress }) => (
  <Button
    style={styles.loginButton}
    onPress={onPress}
  >
    <Text>Ingresar</Text>
  </Button>
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
