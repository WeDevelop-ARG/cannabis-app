import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { SvgXml } from 'react-native-svg'
import NavigationService from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import SocialNetworkButton from '../SocialNetworkButton'
import * as AuthenticationService from '~/authenticationService'
import googleIcon from '~/assets/images/Authentication/googleIcon.svg'
import styles, { ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT } from './styles'

const GoogleButton = ({ style }) => {
  const [signing, setSigning] = useState(false)

  const onGoogleButtonPress = async () => {
    setSigning(true)

    let username
    let loginError
    try {
      const firebaseCredential = await AuthenticationService.googleLogin()
      username = await DatabaseService.queryUsernameFromEmail(firebaseCredential.user.email)
    } catch (error) {
      loginError = error
    } finally {
      setSigning(false)
    }

    if (!loginError) {
      if (username) {
        NavigationService.navigate('MainApp')
      } else {
        NavigationService.navigate('UsernameRequest')
      }
    }
  }

  return (
    <SocialNetworkButton style={[styles.button, style]} onPress={onGoogleButtonPress}>
      {signing
        ? (
          <ActivityIndicator size={ICON_SIZE_HEIGHT} />
        )
        : (
          <SvgXml
            width={ICON_SIZE_WIDTH}
            height={ICON_SIZE_HEIGHT}
            xml={googleIcon}
          />
        )}
    </SocialNetworkButton>
  )
}

export default GoogleButton
