import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text } from '~/components'
import SocialNetworkButton from '../SocialNetworkButton'
import styles from './styles'

const GoogleButton = ({ style, onPress }) => (
  <SocialNetworkButton style={[styles.button, style]} onPress={onPress}>
    <Icon style={styles.icon} name='google' size={15} color='white' />
    <Text style={styles.text}>Ingresá con tu cuenta de Google</Text>
  </SocialNetworkButton>
)

export default GoogleButton
