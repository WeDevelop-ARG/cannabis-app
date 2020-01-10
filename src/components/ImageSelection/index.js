import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { PrimaryButton, Subtitle, Description, GrayButton } from '~/components'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import * as ImageService from '~/imageService'
import { theme } from '~/constants'
import { moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  innerContainer: {
    padding: theme.sizes.padding * 2
  },
  button: {
    width: '100%',
    margin: 0,
    marginTop: moderateScale(5)
  },
  title: {
    marginBottom: verticalScale(30)
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
    if (onCancel) {
      await onCancel()
    }
  }

  return (
    <Overlay
      isVisible={isVisible}
      width='auto'
      height='auto'
      onBackdropPress={cancel}
    >
      <View style={styles.innerContainer}>
        <Subtitle black style={styles.title}>
          Seleccionar desde:
        </Subtitle>
        <PrimaryButton style={styles.button} onPress={callCamera}>
          <Description white>
            Cámara
          </Description>
        </PrimaryButton>
        <PrimaryButton style={styles.button} onPress={callGallery}>
          <Description white>
            Galería
          </Description>
        </PrimaryButton>
        <GrayButton style={styles.button} onPress={cancel}>
          <Description white>
            Cancelar
          </Description>
        </GrayButton>
      </View>
    </Overlay>
  )
}

export default ImageSelection
