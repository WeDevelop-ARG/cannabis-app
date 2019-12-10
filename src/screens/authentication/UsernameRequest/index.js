import React, { useState } from 'react'
import { KeyboardAvoidingView, Image, TextInput, ActivityIndicator } from 'react-native'
import { Text, Button } from '~/components'
import Background from '~/helpers/Background'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import NavigationService from '~/navigationService'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'
import { enableNotificationsForUser } from '../utils'

const SubmitIndicator = ({ submitting }) => (
  submitting &&
    <ActivityIndicator
      style={styles.submitIndicator}
      size='large' />
)

const Error = ({ error }) => (
  error && <Text fontVariant='h3' style={styles.error}>{error}</Text>
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
        await enableNotificationsForUser()
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
        <Text fontVariant='description' style={styles.information}>Antes de iniciar sesión vamos a necesitar un nombre para tu usuario.</Text>
        <Text fontVariant='h1' style={styles.usernameTag}>Usuario</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Escribinos un nombre de usuario'
          placeholderTextColor='white'
          onChangeText={(text) => handleInputText(text)}
          value={textInputValue}
        />
        <Error error={error} />
        <SubmitIndicator submitting={submitting} />
        <Button
          style={styles.submitButton}
          onPress={submitHandler}
        >
          <Text>Aceptar</Text>
        </Button>
      </KeyboardAvoidingView>
    </Background>
  )
}

export default UsernameRequest
