import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Button, BackButton } from '~/components/buttons'
import styles from './styles'

const ReviewHeader = ({ goBack, changeImage, deleteImage }) => (
  <View style={styles.headerContainer}>
    <BackButton onPress={goBack} />
    <View style={styles.imageButtonsContainer}>
      <Button style={styles.changeButton} onPress={changeImage}>
        <Icon name='redo' size={18} color='black' />
      </Button>
      <Button style={styles.deleteButton} onPress={deleteImage}>
        <Icon name='trash-alt' size={18} color='black' />
      </Button>
    </View>
  </View>
)

export default ReviewHeader
