import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button } from '~/components'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const Header = ({ onExitPress }) => (
  <View style={styles.headerContainer}>
    <Image
      style={styles.headerImage}
      source={DrCannabis}
    />
    <Button variant='alpha' onPress={onExitPress}>
      <Text>Saltar</Text>
    </Button>
  </View>
)

export default Header
