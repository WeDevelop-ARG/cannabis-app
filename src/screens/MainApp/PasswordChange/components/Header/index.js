import React from 'react'
import { View } from 'react-native'
import BackButton from '~/components/buttons/BackButton'
import styles from './styles'

const Header = ({ goBack }) => (
  <View style={styles.container}>
    <BackButton onPress={goBack} />
  </View>
)

export default Header
