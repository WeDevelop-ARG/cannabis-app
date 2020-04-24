import React from 'react'
import { View } from 'react-native'
import { BackButton } from '~/components/buttons'
import { Title } from '~/components/texts'
import styles, { BACK_BUTTON_COLOR } from './styles'

const Header = ({ title, onBackButtonPress }) => (
  <View style={styles.container}>
    <BackButton
      style={styles.backButton}
      color={BACK_BUTTON_COLOR}
      onPress={onBackButtonPress}
    />
    <View style={styles.usernameContainer}>
      <Title white>{title}</Title>
    </View>
  </View>
)

export default Header
