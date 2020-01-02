import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack'
import { Text, Button, ImageSelection } from '~/components'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const NoPhotoDisclaimer = ({ navigation }) => {
  const [showImageSelection, setShowImageSelection] = useState(false)

  const onImagesSelected = (images) => {
    setShowImageSelection(false)
    navigation.navigate('ImageReview', { images })
  }

  return (
    <View style={styles.container}>
      {showImageSelection && (
        <ImageSelection
          onCancel={() => setShowImageSelection(false)}
          onImagesSelected={onImagesSelected}
        />
      )}
      <Image source={DrCannabis} style={styles.image} />
      <Text colorVariant='gray'>
        Ya no tenés fotos para enviar
      </Text>
      <Button
        onPress={() => setShowImageSelection(true)}
        variant='gray'
      >
        <Text>Agregar fotos</Text>
      </Button>
    </View>
  )
}

NoPhotoDisclaimer.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <HeaderBackButton onPress={() => navigation.pop()} />
  )
})

export default NoPhotoDisclaimer
