import React, { useState } from 'react'
import NavigationService from '../../navigationService'
import { ImageBackground, Text, View, Image, TextInput, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AppText from '../../helpers/AppText'
import styles from './styles'

const SignUp = () => {
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (values) => {
    setAuthenticating(true)
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      NavigationService.navigate('Home')
    } catch (error) {
      setError(error)
      setAuthenticating(false)
    }
  }

  if (authenticating) {
    return <ActivityIndicator />
  }

  if (error) {
    return (
      <View>
        <Text>
          {error.message}
        </Text>
      </View>
    )
  }

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

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('./background.jpg')}
    >
      <View style={styles.container}>
        <Image
          style={styles.signUpImage}
          source={require('./signUpIconWhite.png')}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {formikProps => (
            <KeyboardAvoidingView style={styles.signUpForm}>
              <AppText style={[styles.whiteText, { fontSize: 18 }]}> Crear cuenta</AppText>
              <TextInput
                style={styles.label}
                placeholder='email@ejemplo.com'
                placeholderTextColor='white'
                onChangeText={formikProps.handleChange('email')}
                value={formikProps.values.email}
              />
              {formikProps.touched.email && formikProps.errors.email &&
                <AppText style={[styles.whiteText, styles.errorMessage]}>{formikProps.errors.email}</AppText>
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
                <AppText style={[styles.whiteText, styles.errorMessage]}>{formikProps.errors.password}</AppText>
              }
              <TouchableHighlight
                style={styles.signUpButton}
                onPress={formikProps.handleSubmit}
              >
                <AppText style={styles.whiteText}>
              Registrarme
                </AppText>
              </TouchableHighlight>

            </KeyboardAvoidingView>
          )}
        </Formik>
        <AppText style={[styles.whiteText, styles.hasAccount]}>Ya tenés una cuenta? {' '}
          <AppText style={styles.underLineText}>
           Inicia sesión
          </AppText>
        </AppText>
      </View>
    </ImageBackground>
  )
}

SignUp.navigationOptions = () => ({
  header: null
})

export default SignUp
