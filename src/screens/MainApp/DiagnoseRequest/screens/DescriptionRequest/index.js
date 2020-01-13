import React, { useState } from 'react'
import { TextInput, Alert, ScrollView } from 'react-native'
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

  AnalyticsService.setCurrentScreenName('Description Request')

  const imagesUris = navigation.getParam('images', [])

  const handleInput = (text) => {
    setUploadEnabled(text !== '')
    setDescription(text)
  }

  const onProgress = async (snapshot) => {
    setUploadProgress(v => v + ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 / imagesUris.length))
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
      } catch (error) {
        setUploadProgress(v => v + 100 / imagesUris.length)
      }
    }

    if (uploadedImages.length > 0) {
      await updateDatabase(uploadedImages)
      navigation.navigate('FinishRequest')
    } else {
      Alert.alert('No se han podido subir las imagenes. Intente nuevamente o seleccione otras imagenes.')
    }
  }

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Subtitle black style={styles.title}>
          Describí las particularidades de tu planta
        </Subtitle>
        <Description gray style={styles.description}>
          Cuanta mas información escribas, mejor. Por favor, no incluyas datos de contacto.
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

DescriptionRequest.navigationOptions = {
  title: 'Nueva consulta'
}

export default DescriptionRequest
