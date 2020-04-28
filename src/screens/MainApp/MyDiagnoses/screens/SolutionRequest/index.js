import React, { useState, useEffect } from 'react'
import { TextInput, Alert, ScrollView, View, BackHandler } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { SvgXml } from 'react-native-svg'
import { BoxShadow } from 'react-native-shadow'
import { PrimaryButton, Body, Description, Subtitle } from '~/components'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import Background from '~/components/Background'
import { theme } from '~/constants'
import styles from './styles'
import logo from '~/assets/images/SolutionRequest/logo.svg'

const SolutionRequest = ({ navigation }) => {
  AnalyticsService.setCurrentScreenName('Solution Request')

  const [description, setDescription] = useState('')
  const [inputEnabled, setInputEnabled] = useState(true)
  const [uploading, setUploading] = useState(false)

  const diagnose = navigation.state.params.diagnose

  const handleInput = (text) => {
    setDescription(text)
  }

  const handleUpload = async () => {
    setInputEnabled(false)
    setUploading(true)
    let doNavigate = false
    try {
      const responseBody = {
        answer: description
      }

      await DatabaseService.addDiagnoseResponse(diagnose.id, responseBody)
      await DatabaseService.setDiagnoseSolvedMark(diagnose.id, true)

      setDescription('')
      doNavigate = true
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo realizar la operación. Por favor, intente nuevamente más tarde.'
      )
    } finally {
      setUploading(false)
      setInputEnabled(true)
      if (doNavigate) navigation.navigate('FinishScreen')
    }
  }

  const uploadEnabled = (description !== '' && !uploading)

  useEffect(() => {
    if (uploading) {
      navigation.setParams({
        hideBack: true
      })
      const handler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true
      )
      return () => {
        handler.remove()
      }
    }
  }, [uploading])

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logo}><SvgXml xml={logo} /></View>
        <Subtitle black style={styles.title}>
          ¿Cómo resolviste tu consulta?
        </Subtitle>
        <Description gray style={styles.description}>
          Describí en pocas palabras cuál fue la solución
        </Description>
        <BoxShadow
          setting={{
            width: scale(322),
            height: verticalScale(90),
            border: moderateScale(5),
            opacity: 0.02,
            radius: moderateScale(5),
            style: styles.shadow
          }}
        >
          <TextInput
            onChangeText={handleInput}
            value={description}
            style={styles.input}
            editable={inputEnabled}
            placeholder='La solución fue...'
            placeholderTextColor={theme.colors.gray}
            numberOfLines={2}
            multiline
          />
        </BoxShadow>
        <PrimaryButton
          style={styles.button}
          onPress={handleUpload}
          disabled={!uploadEnabled}
        >
          <Description white>
            {uploading ? 'Enviando...' : 'Enviar'}
          </Description>
        </PrimaryButton>
      </ScrollView>
    </Background>
  )
}

SolutionRequest.navigationOptions = ({ navigation }) => {
  const options = {
    title: 'Resolver solicitud',
    headerLeft: null,
    headerRight: () => {
      return <Body style={styles.cancel} secondary onPress={() => navigation.pop()}>Cancelar</Body>
    }
  }

  if (navigation.state.params && navigation.state.params.hideBack) {
    return {
      ...options,
      headerRight: null
    }
  }

  return options
}

export default SolutionRequest
