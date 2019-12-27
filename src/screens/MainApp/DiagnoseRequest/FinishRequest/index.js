import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button } from '~/components'
import styles from './styles'

const FinishRequest = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <Text fontVariant='h2' colorVariant='black' style={styles.title}>Listo! Ya solicitaste tu diagnóstico</Text>
      <Text fontVariant='description' colorVariant='black' style={styles.description}>En breve nuestros expertos responderán tus consultas</Text>
      <Button variant='black' style={styles.button} onPress={() => navigation.navigate('DiagnoseRequest')}>
        <Text>Solicitar nuevo diagnóstico</Text>
      </Button>
      <Button variant='primary' style={styles.buttonLink}>
        <Text fontVariant='description' colorVariant='black'>Ver solicitudes</Text>
      </Button>
    </View>
  )
}

export default FinishRequest
