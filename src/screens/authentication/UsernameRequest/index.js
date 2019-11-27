import React, { useState } from 'react'
import { KeyboardAvoidingView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import AppText from '~/helpers/AppText'
import Background from '~/helpers/Background'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import NavigationService from '~/navigationService'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const SubmitIndicator = ({ submitting }) => (
  submitting &&
    <ActivityIndicator
      style={styles.submitIndicator}
      size='large' />
)

const Error = ({ error }) => (
  error && <AppText style={styles.error}>{error}</AppText>
)

const UsernameRequest = (props) => {
  const [textInputValue, setTextInputValue] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const submitHandler = async () => {
    setSubmitting(true)
    setError(null)
    let signedIn = false

    try {
      if (textInputValue === '') {
        setError('Nombre de usuario no válido')
      } else {
        if (await DatabaseService.usernameAlreadyInUse(textInputValue)) {
          setError('Este nickname ya existe')
        } else {
          if (props.navigation.state.params.socialNetwork === 'google') {
            const userCredential = await AuthenticationService.googleLogin()
            await DatabaseService.addNewUserData(userCredential.user.uid, {
              username: textInputValue,
              email: userCredential.user.email
            })
            signedIn = true
          }
        }
      }
    } catch (error) {
      setError('Error inesperado, pruebe más tarde.')
    } finally {
      setSubmitting(false)
      if (signedIn) {
        NavigationService.navigate('MainApp')
      }
    }
  }

  const handleInputText = (text) => {
    setTextInputValue(text)
    setError(null)
  }

  return (
    <Background>
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.drCannabisIcon}
          source={DrCannabis}
        />
        <AppText style={styles.information}>Antes de iniciar sesión vamos a necesitar un nombre para tu usuario.</AppText>
        <AppText style={styles.usernameTag}>Usuario</AppText>
        <TextInput
          style={styles.textInput}
          placeholder='Escribinos un nombre de usuario'
          placeholderTextColor='white'
          onChangeText={(text) => handleInputText(text)}
          value={textInputValue}
        />
        <Error error={error} />
        <SubmitIndicator submitting={submitting} />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitHandler}
        >
          <AppText style={styles.submitButtonText}>Aceptar</AppText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Background>
  )
}

export default UsernameRequest
