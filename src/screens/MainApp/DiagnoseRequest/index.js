import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import * as ImageService from '~/imageService'
import * as StorageService from '~/storageService'
import * as DatabaseService from '~/databaseService'
import FullScreenActivityIndicator from '~/helpers/FullScreenActivityIndicator'
import DiagnoseProblemDescription from './DiagnoseProblemDescription'
import DiagnosePhoto from './DiagnosePhoto'
import DiagnoseSubmit from './DiagnoseSubmit'
import styles from './styles'
import DiagnoseError from './DiagnoseError'
import cameraIcon from './resources/cameraIcon.png'

const DiagnoseRequest = () => {
  const [problemDescription, setProblemDescription] = useState('')
  const [image, setImage] = useState(null)
  const [imageSource, setImageSource] = useState(cameraIcon)
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const resetStates = () => {
    setProblemDescription('')
    setImage(null)
    setImageSource(cameraIcon)
    setSubmitting(false)
  }

  const selectImage = async () => {
    setError(null)
    try {
      const selectedImage = await ImageService.selectImageFromGalleryOrCamera()
      const uri = ImageService.getURIFromImage(selectedImage)
      setImage(selectedImage)
      setImageSource({ uri })
    } catch (error) {
      setError('No se seleccionó ninguna imagen')
      setImage(null)
      setImageSource(cameraIcon)
    }
  }

  const onSubmit = async (image, problemDescription) => {
    setSubmitting(true)
    try {
      const imageURI = ImageService.getURIFromImage(image)
      const imageReference = await StorageService.uploadImageAndReturnReference(imageURI)
      await DatabaseService.addDiagnose(imageReference, problemDescription)
    } catch (error) {
      setError('Ocurrió un problema al subir el diagnóstico')
    } finally {
      resetStates()
    }
  }

  if (isSubmitting) {
    return <FullScreenActivityIndicator />
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <DiagnosePhoto
        onPress={() => selectImage()}
        imageToShow={imageSource}
        isNewUpload={!!image}
      />
      <DiagnoseError error={error} />
      <KeyboardAvoidingView style={styles.descriptionAndSubmitContainer}>
        <DiagnoseProblemDescription
          problemDescription={problemDescription}
          setProblemDescription={setProblemDescription}
        />
        <DiagnoseSubmit
          onPress={() => onSubmit(image, problemDescription)}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  )
}

export default DiagnoseRequest
