import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TextInput, Alert, ScrollView, View, BackHandler } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { SvgXml } from 'react-native-svg'
import { BoxShadow } from 'react-native-shadow'
import { without } from 'lodash'
import { Body, Description, Subtitle } from '~/components'
import AlphaButton from '~/components/buttons/AlphaButton'
import ProgressButton from '~/components/buttons/ProgressButton'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import * as StorageService from '~/storageService'
import Background from '~/components/Background'
import decorateWithNoConnectionCheckAndNavigation from '~/decorators/decorateWithNoConnectionCheckAndNavigation'
import ImageList from './components/ImageList'
import logo from '~/assets/images/SolutionRequest/logo.svg'
import styles, { INPUT_PLACEHOLDER_COLOR } from './styles'

const SolutionRequest = ({ navigation }) => {
  const images = navigation.state.params.images
  const diagnose = navigation.state.params.diagnose

  const [description, setDescription] = useState('')
  const [inputEnabled, setInputEnabled] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [solvedImages, setSolvedImages] = useState(images)
  const currentProgress = useRef(0)

  useEffect(() => {
    AnalyticsService.setCurrentScreenName('Solution Request')
  }, [])

  const removeImageFromList = useCallback((image) => {
    const chosenImages = without(solvedImages, image)
    setSolvedImages(chosenImages)
  }, [solvedImages])

  const goToGallery = useCallback(() => {
    navigation.navigate('SolutionGallery', { selectedImages: solvedImages })
  }, [solvedImages])

  useEffect(() => {
    setSolvedImages(images)
  }, [images])

  const onProgress = useCallback((snapshot) => {
    setUploadProgress(currentProgress.current + (snapshot.bytesTransferred / snapshot.totalBytes) * 90 / solvedImages.length)
  }, [currentProgress.current, solvedImages])

  const handleInput = useCallback((text) => {
    setDescription(text)
  }, [])

  const handleUpload = decorateWithNoConnectionCheckAndNavigation(async () => {
    setInputEnabled(false)
    setUploading(true)
    let doNavigate = false
    try {
      const imageReferences = await StorageService.uploadImagesAndReturnReferences(solvedImages, onProgress)

      const responseBody = {
        answer: description,
        imageReferences
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
  })

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
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            numberOfLines={2}
            multiline
          />
        </BoxShadow>
        <ImageList images={solvedImages} onImagePress={removeImageFromList} />
        <AlphaButton
          style={styles.addImagesButton}
          onPress={goToGallery}
        >
          <Description gray>
            Agregar imágenes
          </Description>
        </AlphaButton>
        <ProgressButton
          style={styles.button}
          onPress={handleUpload}
          disabled={!uploadEnabled}
          progress={uploadProgress}
        >
          <Description white>
            {uploading ? 'Enviando...' : 'Enviar'}
          </Description>
        </ProgressButton>
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
