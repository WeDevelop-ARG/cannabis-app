import React, { useState, useRef } from 'react'
import { TextInput, Alert, ScrollView, BackHandler } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { BoxShadow } from 'react-native-shadow'
import { ProgressButton, Description, Subtitle } from '~/components'
import * as AnalyticsService from '~/analyticsService'
import * as StorageService from '~/storageService'
import * as DatabaseService from '~/databaseService'
import Background from '~/components/Background'
import { theme } from '~/constants'
import styles from './styles'

const DescriptionRequest = ({ navigation }) => {
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadEnabled, setUploadEnabled] = useState(false)
  const [inputEnabled, setInputEnabled] = useState(true)
  const currentProgress = useRef(0)

  AnalyticsService.setCurrentScreenName('Description Request')

  const imagesUris = navigation.getParam('images', [])

  React.useEffect(() => {
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

  const handleInput = (text) => {
    setUploadEnabled(text !== '')
    setDescription(text)
  }

  const onProgress = (snapshot) => {
    setUploadProgress(currentProgress.current + (snapshot.bytesTransferred / snapshot.totalBytes) * 90 / imagesUris.length)
  }

  const updateDatabase = async (uploadedImages) => {
    try {
      await DatabaseService.addDiagnose(uploadedImages, description)
    } catch (error) {
      Alert.alert('No se han podido subir las imagenes. Intente nuevamente o seleccione otras imagenes.')
    }
  }

  const handleUpload = async () => {
    setUploadEnabled(false)
    setInputEnabled(false)
    setUploading(true)

    const uploadedImages = []

    for (let i = 0; i < imagesUris.length; i++) {
      const uri = imagesUris[i]
      try {
        const uid = await StorageService.uploadImageAndReturnReference(uri, onProgress)
        uploadedImages.push(uid)
      } finally {
        currentProgress.current += 90 / imagesUris.length
      }
    }

    if (uploadedImages.length > 0) {
      await updateDatabase(uploadedImages)
      setUploadProgress(100)
      setUploading(false)
      navigation.navigate('FinishRequest')
    } else {
      Alert.alert('No se han podido subir las imagenes. Intente nuevamente o seleccione otras imágenes.')
    }
  }

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Subtitle black style={styles.title}>
          Describí las particularidades de tu planta
        </Subtitle>
        <Description gray style={styles.description}>
          Cuanta más información escribas, mejor. Por favor, no incluyas datos de contacto.
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
            placeholder='Mi planta tiene...'
            placeholderTextColor={theme.colors.gray}
            numberOfLines={2}
            multiline
          />
        </BoxShadow>
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

DescriptionRequest.navigationOptions = ({ navigation }) => {
  const options = {
    title: 'Nueva consulta'
  }

  if (navigation.state.params && navigation.state.params.hideBack) {
    return {
      ...options,
      headerLeft: null
    }
  }

  return options
}

export default DescriptionRequest
