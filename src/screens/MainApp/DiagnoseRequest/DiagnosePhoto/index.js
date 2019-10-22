import React from 'react'
import { TouchableImageWithText } from '~/helpers/TouchableImage'
import AppText from '~/helpers/AppText'
import styles from './styles'

const AddOrChange = ({ isNewUpload }) => (
  isNewUpload
    ? <AppText>Cambiar</AppText>
    : <AppText>Agregar</AppText>
)

const DiagnosePhoto = ({ onPress, imageToShow, isNewUpload }) => (
  <TouchableImageWithText
    wholeStyle={styles.takePhoto}
    imageStyle={styles.takePhotoImage}
    textStyle={styles.takePhotoText}
    onPress={onPress}
    source={imageToShow}
  >
    <AddOrChange isNewUpload={isNewUpload} />
  </TouchableImageWithText>
)

export default DiagnosePhoto
