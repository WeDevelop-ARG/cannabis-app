import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TextInput, ActivityIndicator, View, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as AnalyticsService from '~/analyticsService'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import NavigationService from '~/navigationService'
import Background from '~/components/Background'
import { Description, Subtitle, Error } from '~/components/texts'
import { PrimaryButton, Button } from '~/components/buttons'
import SuggestionBox from '~/components/SuggestionBox'
import decorateWithNoConnectionCheckAndNavigation from '~/decorators/decorateWithNoConnectionCheckAndNavigation'
import usernameIcon from '~/assets/images/UsernameRequest/usernameIcon.svg'
import styles, { PLACEHOLDER_TEXT_COLOR, ICON_WIDTH, ICON_HEIGHT } from './styles'

const NUMBER_OF_POSSIBLE_USERNAMES = 9
const RANDOMIZER_NUMBER = 100
const SUGGESTION_BOX_LENGTH = 4

const usernamesOcuppied = [
  'AlFumeta',
  'THCPower',
  '25gr',
  'fernando_cannabis',
  'sativa_91',
  'RubenStonner',
  'CRIPY',
  'weedow',
  'ganjahman',
  'tricoman',
  'thegreendoctor',
  'bluesativa',
  'Sintabaco',
  'paulaenverde',
  'joseliyo',
  'jamaica97',
  'cannabisIndica',
  'cogollosano'
]

const SubmitIndicator = ({ submitting }) => (
  submitting &&
    <ActivityIndicator
      style={styles.submitIndicator}
      size='large'
    />
)

const SubmitButton = ({ disabled, onPress, error }) => (
  <PrimaryButton
    onPress={onPress}
    style={error ? styles.submitButtonWithError : styles.submitButton}
    disabled={Boolean(error || disabled)}
  >
    <Description white>Continuar</Description>
  </PrimaryButton>
)

const Icon = () => (
  <SvgXml
    width={ICON_WIDTH}
    height={ICON_HEIGHT}
    style={styles.icon}
    xml={usernameIcon}
  />
)

const Suggestions = ({ error, suggestions, onSuggestionSelected }) => (
  error && (
    <View style={styles.suggestionContainer}>
      {suggestions.map((suggestion, index) => {
        return (
          <Button onPress={() => onSuggestionSelected(suggestion)} key={index}>
            <SuggestionBox boxStyle={(index === (suggestions.length - 1)) ? styles.lastSuggestionBox : {}}>
              {suggestion}
            </SuggestionBox>
          </Button>
        )
      })}
    </View>
  )
)

const UsernameRequest = () => {
  const [textInputValue, setTextInputValue] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [suggestions, setSuggestions] = useState([null])
  const [usernameExists, setUsernameExists] = useState(null)

  const submitHandler = decorateWithNoConnectionCheckAndNavigation(async () => {
    setSubmitting(true)
    setError(null)
    let newUsernameCreated = false

    try {
      if (await DatabaseService.usernameAlreadyInUse(textInputValue) || usernamesOcuppied.includes(textInputValue)) {
        setError(`El usuario "${textInputValue}" no está disponible`)
        setUsernameExists(true)
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
  })

  const handleInputText = (text) => {
    setTextInputValue(text)
    setError(null)
  }

  const onSuggestionSelected = (suggestion) => {
    setTextInputValue(suggestion)
    setError(false)
  }

  useEffect(() => {
    AnalyticsService.setCurrentScreenName('Username Request')
  }, [])

  useEffect(() => {
    const createSuggestions = async () => {
      let possibleUsernames = []
      let i = 0

      while (i < NUMBER_OF_POSSIBLE_USERNAMES) {
        possibleUsernames[i] = (textInputValue + '_' + Math.floor(Math.random() * RANDOMIZER_NUMBER))
        i++
      }
      const usedUsernames = await DatabaseService.findUsersWithUsernames(possibleUsernames)

      if (usedUsernames) {
        possibleUsernames = possibleUsernames.filter(u => !(usedUsernames.includes(u)))
      }
      possibleUsernames = possibleUsernames.splice(0, SUGGESTION_BOX_LENGTH)
      setSuggestions(possibleUsernames)
    }

    if (usernameExists) {
      createSuggestions()
      setUsernameExists(false)
    }
  }, [usernameExists])

  return (
    <Background>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <Icon />
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
          {error &&
            <Error style={styles.error}>  El usuario "{textInputValue}" no está disponible </Error>}
          {error &&
            <Subtitle style={styles.suggestionTitle}> Sugerencias </Subtitle>}
          <Suggestions
            error={error}
            suggestions={suggestions}
            onSuggestionSelected={onSuggestionSelected}
          />
          <SubmitIndicator submitting={submitting} />
          <SubmitButton
            error={error}
            disabled={(textInputValue === '')}
            onPress={submitHandler}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  )
}

export default UsernameRequest
