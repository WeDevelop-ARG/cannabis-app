import React, { useState } from 'react'
import { KeyboardAvoidingView, TextInput, ActivityIndicator, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Body, Description, Subtitle } from '~/components/texts'
import { PrimaryButton, GrayButton } from '~/components/buttons'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import NavigationService from '~/navigationService'
import usernameIcon from '~/assets/images/UsernameRequest/usernameIcon.svg'
import styles, { PLACEHOLDER_TEXT_COLOR, ICON_WIDTH, ICON_HEIGHT } from './styles'

const SubmitIndicator = ({ submitting }) => (
  submitting &&
    <ActivityIndicator
      style={styles.submitIndicator}
      size='large'
    />
)

const Error = ({ error }) => (
  error && (
    <Body
      secondary
      style={styles.error}
    >
      {error}
    </Body>
  )
)

const SubmitButton = ({ value, onPress }) => {
  if (value === '') {
    return (
      <GrayButton>
        <Description white>Continuar</Description>
      </GrayButton>
    )
  } else {
    return (
      <PrimaryButton
        onPress={onPress}
      >
        <Description white>Continuar</Description>
      </PrimaryButton>
    )
  }
}

const Icon = () => (
  <>
    <View style={styles.iconBackground} />
    <SvgXml
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      style={styles.icon}
      xml={usernameIcon}
    />
  </>
)

const UsernameRequest = (props) => {
  const [textInputValue, setTextInputValue] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const submitHandler = async () => {
    setSubmitting(true)
    setError(null)
    let newUsernameCreated = false

    try {
      if (await DatabaseService.usernameAlreadyInUse(textInputValue)) {
        setError('Este nickname ya existe')
      } else {
        const user = await AuthenticationService.getCurrentUser()

        await DatabaseService.addNewUserData(user.uid, {
          username: textInputValue,
          email: user.email
        })

        newUsernameCreated = true
      }
    } catch (error) {
      setError('Error inesperado, pruebe más tarde.')
    } finally {
      setSubmitting(false)
      if (newUsernameCreated) {
        NavigationService.navigate('MainApp')
      }
    }
  }

  const handleInputText = (text) => {
    setTextInputValue(text)
    setError(null)
  }

  return (
    <>
      <Icon />
      <KeyboardAvoidingView style={styles.container}>
        <Subtitle style={styles.title}>Creá tu nombre de usuario</Subtitle>
        <Description
          gray
          style={styles.description}
        >
        Escribí un nombre de usuario para identificarte dentro de la plataforma
        </Description>
        <TextInput
          style={styles.textInput}
          placeholder='Nombre de usuario'
          placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          onChangeText={(text) => handleInputText(text)}
          value={textInputValue}
        />
        <Error error={error} />
        <SubmitIndicator submitting={submitting} />
        <SubmitButton
          value={textInputValue}
          onPress={submitHandler}
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default UsernameRequest
