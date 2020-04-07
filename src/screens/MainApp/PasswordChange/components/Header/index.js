import React from 'react'
import { View } from 'react-native'
import BackButton from '~/components/buttons/BackButton'
import Header from '~/components/texts/Header'
import styles from './styles'

const HeaderComponent = ({ goBack }) => (
  <View style={styles.container}>
    <Header>Cambiar contraseña</Header>
    <View style={styles.backButton}>
      <BackButton onPress={goBack} />
    </View>
  </View>
)

export default HeaderComponent
