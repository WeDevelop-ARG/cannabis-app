import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button } from '~/components'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const goToCallToAction = () => {
  console.log('Going to Call To Action')
}

const NoPhotoDisclaimer = () => (
  <View style={styles.container}>
    <Image source={DrCannabis} style={styles.image} />
    <Text colorVariant='gray'>
      Ya no tenés fotos para enviar
    </Text>
    <Button
      onPress={goToCallToAction}
      variant='gray'
    >
      <Text>Agregar fotos</Text>
    </Button>
  </View>
)

NoPhotoDisclaimer.navigationOptions = () => ({
  header: null
})

export default NoPhotoDisclaimer
