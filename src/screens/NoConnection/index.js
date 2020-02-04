import React from 'react'
import { View, BackHandler } from 'react-native'
import Background from '~/components/Background'
import { Description, PrimaryButton, Title } from '~/components'
import styles from './styles'

const NoConnection = () => {
  return (
    <Background style={styles.container}>
      <View>
        <Title style={styles.text}>No hay conexion a internet. Intente nuevamente más tarde.</Title>
        <PrimaryButton onPress={() => { BackHandler.exitApp() }}>
          <Description white>Aceptar</Description>
        </PrimaryButton>
      </View>
    </Background>
  )
}

export default NoConnection
