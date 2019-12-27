import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Button, Text } from '~/components'
import { verticalScale, moderateScale } from 'react-native-size-matters'
import * as ImageService from '~/imageService'

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(20),
    margin: moderateScale(5),
    borderRadius: 2
  },
  title: {
    marginBottom: verticalScale(10)
  }
})

const ImageSelection = ({ onImagesSelected, onCancel }) => {
  const [isVisible, setIsVisible] = useState(true)

  const callCamera = async () => {
    try {
      const images = await ImageService.openCamera()
      imagesSelected(images)
    } catch (error) {
      console.log(error)
    }
  }

  const callGallery = async () => {
    try {
      const images = await ImageService.openGallery()
      imagesSelected(images)
    } catch (error) {
      console.log(error)
    }
  }

  const imagesSelected = (images) => {
    setIsVisible(false)
    if (onImagesSelected) {
      onImagesSelected(images)
    }
  }

  const cancel = async () => {
    setIsVisible(false)
    ImageService.clean()
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
