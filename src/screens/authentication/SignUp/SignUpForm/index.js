import React from 'react'
import { KeyboardAvoidingView, TextInput, TouchableHighlight } from 'react-native'
import { Formik } from 'formik'
import AppText from '~/helpers/AppText'
import AuthenticatingIndicator from '~/screens/authentication/AuthenticatingIndicator'
import styles from './styles'

const Error = ({ error }) => (
  error && <AppText style={styles.signUpError}>
  Combinación de usuario, email y contraseña no aceptada.
  </AppText>
)

const SignUpButton = ({ onPress }) => (
  <TouchableHighlight
    style={styles.signUpButton}
    onPress={onPress}
  >
    <AppText style={styles.signUpText}>
        Registrarme
    </AppText>
  </TouchableHighlight>
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
          placeholder='Nombre de usuario'
          placeholderTextColor='white'
          onChangeText={formikProps.handleChange('username')}
          value={formikProps.values.username}
        />
        {formikProps.touched.username && formikProps.errors.username &&
        <AppText style={styles.errorMessage}>{formikProps.errors.username}</AppText>
        }
        <TextInput
          style={styles.label}
          placeholder='email@ejemplo.com'
          placeholderTextColor='white'
          onChangeText={formikProps.handleChange('email')}
          value={formikProps.values.email}
        />
        {formikProps.touched.email && formikProps.errors.email &&
        <AppText style={styles.errorMessage}>{formikProps.errors.email}</AppText>
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
        <AppText style={styles.errorMessage}>{formikProps.errors.password}</AppText>
        }
        <Error error={error} />
        <AuthenticatingIndicator authenticating={authenticating} />
        <SignUpButton onPress={formikProps.handleSubmit} />
      </KeyboardAvoidingView>
    )}
  </Formik>
)

export default SignUpForm
