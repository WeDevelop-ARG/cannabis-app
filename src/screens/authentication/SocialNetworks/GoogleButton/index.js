import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationService from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import SocialNetworkButton from '../SocialNetworkButton'
import * as AuthenticationService from '~/authenticationService'
import styles, { ICON_SIZE } from './styles'

const GoogleButton = ({ style }) => {
  const [signing, setSigning] = useState(false)

  const onGoogleButtonPress = async () => {
    setSigning(true)

    let username
    try {
      const firebaseCredential = await AuthenticationService.googleLogin()
      username = await DatabaseService.queryUsernameFromEmail(firebaseCredential.user.email)
    } finally {
      setSigning(false)
    }

    if (username) {
      NavigationService.navigate('MainApp')
    } else {
      NavigationService.navigate('UsernameRequest')
    }
  }

  if (signing) {
    return <ActivityIndicator />
  }

  return (
    <SocialNetworkButton style={[styles.button, style]} onPress={onGoogleButtonPress}>
      <Icon style={styles.icon} name='google' size={ICON_SIZE} color='white' />
    </SocialNetworkButton>
  )
}

export default GoogleButton
