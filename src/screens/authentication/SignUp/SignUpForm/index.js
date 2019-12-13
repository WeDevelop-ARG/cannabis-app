import React from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Formik } from 'formik'
import { Text, Button } from '~/components'
import AuthenticatingIndicator from '~/screens/authentication/AuthenticatingIndicator'
import styles from './styles'

const Error = ({ error }) => (
  error && <Text style={styles.signUpError}>
  Combinación de email y contraseña no aceptada.
  </Text>
)

const SignUpButton = ({ onPress }) => (
  <Button
    style={styles.signUpButton}
    onPress={onPress}
  >
    <Text>Registrarme</Text>
  </Button>
)

const SignUpForm = ({ initialValues, handleSubmit, schema, error, authenticating }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={schema}
  >
    {formikProps => (
      <KeyboardAvoidingView style={styles.signUpForm}>
        <TextInput
          style={styles.label}
          placeholder='email@ejemplo.com'
          placeholderTextColor='white'
          onChangeText={formikProps.handleChange('email')}
          value={formikProps.values.email}
        />
        {formikProps.touched.email && formikProps.errors.email &&
        <Text style={styles.errorMessage}>{formikProps.errors.email}</Text>
        }
        <TextInput
          style={styles.label}
          placeholder='contraseña'
          placeholderTextColor='white'
          secureTextEntry
          onChangeText={formikProps.handleChange('password')}
          value={formikProps.values.password}
        />
        {formikProps.touched.password && formikProps.errors.password &&
        <Text style={styles.errorMessage}>{formikProps.errors.password}</Text>
        }
        <Error error={error} />
        <AuthenticatingIndicator authenticating={authenticating} />
        <SignUpButton onPress={formikProps.handleSubmit} />
      </KeyboardAvoidingView>
    )}
  </Formik>
)

export default SignUpForm
