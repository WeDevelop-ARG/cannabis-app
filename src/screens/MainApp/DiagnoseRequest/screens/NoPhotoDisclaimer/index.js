import React, { useState } from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import ImageSelection from '~/components/ImageSelection'
import { PrimaryButton } from '~/components/buttons'
import { Subtitle, Description } from '~/components/texts'
import icon from '~/assets/images/NoPhotoDisclaimer/icon.svg'
import styles, { ICON_WIDTH, ICON_HEIGHT } from './styles'

const NoPhotoDisclaimer = ({ navigation }) => {
  const [showImageSelection, setShowImageSelection] = useState(false)

  const onImagesSelected = (images) => {
    setShowImageSelection(false)
    navigation.navigate('ImageReview', { images })
  }

  return (
    <>
      <View style={styles.iconBackground} />
      <SvgXml
        style={styles.icon}
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
        xml={icon}
      />
      <View style={styles.container}>
        {showImageSelection && (
          <ImageSelection
            onCancel={() => setShowImageSelection(false)}
            onImagesSelected={onImagesSelected}
          />
        )}
        <Subtitle>No tenés fotos para enviar</Subtitle>
        <Description
          style={styles.information}
          gray
        >
        Parece que borraste todas tus fotos.
        Para continuar con la consulta, agregá un mínimo de 3 fotos.
        </Description>
        <PrimaryButton onPress={() => setShowImageSelection(true)}>
          <Description white>Agregar fotos</Description>
        </PrimaryButton>
      </View>
    </>
  )
}

NoPhotoDisclaimer.navigationOptions = ({ navigation }) => ({
  header: null
})

export default NoPhotoDisclaimer
