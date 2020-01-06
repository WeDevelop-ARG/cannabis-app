import React, { useState } from 'react'
import { View } from 'react-native'
import { ImageSelection, PrimaryButton, Title, Description } from '~/components'
import styles from './styles'
import { SvgXml } from 'react-native-svg'
import Image from '../../resources/Group.svg'

export const MainScreen = ({ navigation }) => {
  const [showImageSelection, setShowImageSelection] = useState(false)

  const onImagesSelected = (images) => {
    setShowImageSelection(false)
    navigation.navigate('ImageReview', { images: images })
  }

  return (
    <>
      {showImageSelection && (
        <ImageSelection
          onCancel={() => setShowImageSelection(false)}
          onImagesSelected={onImagesSelected}
        />
      )}
      <View style={styles.container}>
        <SvgXml width='54' height='65' xml={Image} style={styles.image} />
        <Title black style={styles.title}>
          Conocé el estado de tu planta
        </Title>
        <Description gray style={styles.description}>
          Agregá un mínimo de 3 fotos en detalle y bien iluminadas para que nuestros expertos puedan darte su opinión.
        </Description>
        <PrimaryButton variant='black' style={styles.button} onPress={() => setShowImageSelection(true)}>
          <Description white>
            Agregar fotos
          </Description>
        </PrimaryButton>
      </View>
    </>
  )
}

MainScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

export default MainScreen
