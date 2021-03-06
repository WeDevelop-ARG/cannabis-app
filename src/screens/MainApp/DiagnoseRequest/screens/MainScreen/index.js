import React, { useState } from 'react'
import { View } from 'react-native'
import * as AnalyticsService from '~/analyticsService'
import { ImageSelection, PrimaryButton, Subtitle, Description } from '~/components'
import Background from '~/components/Background'
import styles from './styles'
import { SvgXml } from 'react-native-svg'
import Image from '../../resources/main-screen-logo.svg'

export const MainScreen = ({ navigation }) => {
  const [showImageSelection, setShowImageSelection] = useState(false)

  AnalyticsService.setCurrentScreenName('Main Screen')

  const onImagesSelected = (images) => {
    setShowImageSelection(false)
    navigation.navigate('ImageReview', { images: images })
  }

  return (
    <Background>
      {showImageSelection && (
        <ImageSelection
          onCancel={() => setShowImageSelection(false)}
          onImagesSelected={onImagesSelected}
        />
      )}
      <View style={styles.container}>
        <SvgXml width='54' height='65' xml={Image} style={styles.image} />
        <Subtitle black style={styles.title}>
          Conocé el estado de tu planta
        </Subtitle>
        <Description gray style={styles.description}>
          Agregá un mínimo de 3 fotos en detalle y bien iluminadas para que nuestros expertos puedan darte su opinión.
        </Description>
        <PrimaryButton variant='black' style={styles.button} onPress={() => navigation.navigate('Gallery')}>
          <Description white>
            Agregar fotos
          </Description>
        </PrimaryButton>
      </View>
    </Background>
  )
}

MainScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

export default MainScreen
