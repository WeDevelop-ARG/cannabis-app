import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import AppText from '~/helpers/AppText'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const Header = ({ onExitPress }) => (
  <View style={styles.headerContainer}>
    <Image
      style={styles.headerImage}
      source={DrCannabis}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={onExitPress}
    >
      <AppText style={styles.buttonText}>Saltar</AppText>
    </TouchableOpacity>
  </View>
)

export default Header
