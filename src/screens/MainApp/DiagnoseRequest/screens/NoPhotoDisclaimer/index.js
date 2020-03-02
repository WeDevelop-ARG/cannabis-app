import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as AnalyticsService from '~/analyticsService'
import Background from '~/components/Background'
import { PrimaryButton } from '~/components/buttons'
import { Subtitle, Description } from '~/components/texts'
import icon from '~/assets/images/NoPhotoDisclaimer/icon.svg'
import styles, { ICON_WIDTH, ICON_HEIGHT } from './styles'

const NoPhotoDisclaimer = ({ navigation }) => {
  AnalyticsService.setCurrentScreenName('No Photo Disclaimer')

  return (
    <Background>
      <View style={styles.iconBackground} />
      <SvgXml
        style={styles.icon}
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
        xml={icon}
      />
      <View style={styles.container}>
        <Subtitle>No tenés fotos para enviar</Subtitle>
        <Description
          style={styles.information}
          gray
        >
        Parece que borraste todas tus fotos.
        Para continuar con la consulta, agregá un mínimo de 3 fotos.
        </Description>
        <PrimaryButton onPress={() => {
          navigation.popToTop()
          navigation.navigate('Gallery')
        }}
        >
          <Description white>Agregar fotos</Description>
        </PrimaryButton>
      </View>
    </Background>
  )
}

NoPhotoDisclaimer.navigationOptions = ({ navigation }) => ({
  header: null
})

export default NoPhotoDisclaimer
