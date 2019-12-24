import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Button, Text } from '~/components'
import ImagePicker from 'react-native-image-crop-picker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  button: {
    padding: moderate(20),
    margin: moderateScale(5),
    borderRadius: 2
  },
  title: {
    marginBottom: verticalScale(10)
  }
})

const ImageSelection = ({ onImagesSelected, onCancel }) => {
  const [isVisible, setIsVisible] = useState(true)

  const clean = async () => {
    try {
      await ImagePicker.clean()
    } catch (error) {
      console.log(error)
    }
  }

  const callPickerAction = (action) => {
    ImagePicker[action]({
      mediaType: 'photo',
      multiple: true
    }).then(images => {
      if (Array.isArray(images)) {
        imagesSelected(images)
      } else {
        imagesSelected([images])
      }
    }).catch(error => {
      console.log(error)
      clean()
    })
  }

  const callCamera = () => {
    callPickerAction('openCamera')
  }

  const callGallery = () => {
    callPickerAction('openPicker')
  }

  const imagesSelected = (images) => {
    setIsVisible(false)
    if (onImagesSelected) {
      onImagesSelected(images)
    }
  }

  const cancel = async () => {
    setIsVisible(false)
    clean()
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <Overlay
      overlayStyle={styles.innerContainer}
      isVisible={isVisible}
      width='auto'
      height='auto'
      onBackdropPress={cancel}
    >
      <View>
        <Text fontVariant='h1' colorVariant='black' style={styles.title}>
          Seleccionar desde:
        </Text>
        <Button variant='black' style={styles.button} onPress={callCamera}>
          <Text fontVariant='h3' colorVariant='white'>
            Camara
          </Text>
        </Button>
        <Button variant='black' style={styles.button} onPress={callGallery}>
          <Text fontVariant='h3' colorVariant='white'>
            Galeria
          </Text>
        </Button>
        <Button variant='black' style={styles.button} onPress={cancel}>
          <Text fontVariant='h3' colorVariant='white'>
            Cancelar
          </Text>
        </Button>
      </View>
    </Overlay>
  )
}

export default ImageSelection
