import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import { Text, Button } from '~/components'
import styles from './styles'
import * as StorageService from '~/storageService'
import * as DatabaseService from '~/databaseService'

const ProgressBar = ({ progress }) => {
  const styles = StyleSheet.create({
    container: StyleSheet.absoluteFillObject,
    overlay: {
      backgroundColor: 'black',
      width: `${progress}%`,
      height: '100%'
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
    </View>
  )
}

const DescriptionRequest = ({ navigation, imagesUris }) => {
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadEnabled, setUploadEnabled] = useState(false)
  const [inputEnabled, setInputEnabled] = useState(true)

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
    <View style={styles.container}>
      <Text fontVariant='h2' colorVariant='black' style={styles.title}>
        Describí las particularidades que notás en tu planta
      </Text>
      <TextInput
        onChangeText={handleInput}
        value={description}
        style={styles.input}
        editable={inputEnabled}
      />
      <Text fontVariant='description' colorVariant='black' style={styles.description}>
        Cuanta mas información escribas, mejor. Por favor, no incluyas datos de contacto.
      </Text>
      <Button
        variant={uploadEnabled ? 'black' : 'gray'}
        style={styles.button}
        onPress={handleUpload}
        disabled={!uploadEnabled}
      >
        <ProgressBar progress={uploadProgress} />
        <Text style={styles.buttonText}>
          {((uploading) && 'Enviando...') || 'Enviar'}
        </Text>
      </Button>
    </View>
  )
}

export default DescriptionRequest
