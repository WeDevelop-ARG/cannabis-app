import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Body } from '~/components/texts'
import background from '~/assets/images/DetailedDiagnose/noCommentsYetBackground.svg'
import outline from '~/assets/images/DetailedDiagnose/noCommentsYetOutline.svg'
import styles, { ICON_HEIGHT, ICON_WIDTH } from './styles'

const NoCommentsYet = () => (
  <View style={styles.container}>
    <SvgXml
      style={styles.background}
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      xml={background}
    />
    <SvgXml
      style={styles.outline}
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      xml={outline}
    />
    <Body
      style={styles.text}
      gray
    >
      Aún no tenés comentarios para esta solicitud
    </Body>
  </View>
)

export default NoCommentsYet
