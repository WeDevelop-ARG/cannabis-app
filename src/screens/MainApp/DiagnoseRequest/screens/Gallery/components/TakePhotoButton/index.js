import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Button } from '~/components/buttons'
import { Body } from '~/components/texts'
import CameraLogo from '~/assets/images/Gallery/camera.svg'
import styles from './styles'

const TakePhotoButton = ({ onPress, size }) => {
  return (
    <Button onPress={onPress} style={[styles.box, { width: size, height: size }]}>
      <View style={styles.innerBox}>
        <SvgXml xml={CameraLogo} />
        <Body primary>Sacar foto</Body>
      </View>
    </Button>
  )
}

export default TakePhotoButton
