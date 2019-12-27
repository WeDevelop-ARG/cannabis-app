import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '~/components'
import noAnswersSource from '~/assets/images/detailedDiagnose/noAnswersYet.png'
import styles from './styles'

const NoAnswersYet = () => (
  <View>
    <Image
      style={styles.image}
      source={noAnswersSource}
    />
    <Text
      fontVariant='h3'
      colorVariant='black'
      style={styles.text}
    >
      Aún no tienes mensajes para esta solicitud
    </Text>
  </View>
)

export default NoAnswersYet
