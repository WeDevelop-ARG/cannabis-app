import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AppText from '~/helpers/AppText'
import SocialNetworkButton from '../SocialNetworkButton'
import styles from './styles'

const GoogleButton = ({ style, onPress }) => (
  <SocialNetworkButton style={[styles.button, style]} onPress={onPress}>
    <Icon style={styles.icon} name='google' size={15} color='white' />
    <AppText style={styles.text}>Ingresá con tu cuenta de Google</AppText>
  </SocialNetworkButton>
)

export default GoogleButton
