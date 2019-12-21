import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '~/components'
import NavigationService from '~/navigationService'
import styles from './styles'

const goToRequest = () => {
  NavigationService.navigate('DiagnoseRequest')
}

const NoDiagnoses = () => (
  <View style={styles.container}>
    <Text colorVariant='black'>Todavía no hay solicitudes!</Text>
    <Button
      variant='black'
      style={styles.CTA}
      onPress={goToRequest}
    >
      <Text>Haz una!</Text>
    </Button>
  </View>
)

export default NoDiagnoses
