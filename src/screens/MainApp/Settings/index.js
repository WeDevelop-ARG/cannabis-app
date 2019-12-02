import React from 'react'
import { View, Button } from 'react-native'
import NavigationService from '~/navigationService'
import * as firebase from 'firebase'
import * as AnalyticsService from '~/analyticsService'
import { goToPrivacyPolicyURL } from '~/mixins/privacyPolicyMixins'
import MessagingService from '~/messagingService'

const LogOut = async () => {
  try {
    await MessagingService.deleteFCMTokenForCurrentUser()
    await firebase.auth().signOut()
    NavigationService.navigate('Login')
  } catch (error) {
    console.log(error.message)
  }
}

const Settings = () => {
  AnalyticsService.setCurrentScreenName('Settings')
  return (
    <View>
      <Button
        title='Cerrar sesión'
        onPress={() => { LogOut() }}
      />
      <Button
        title='Política de Privacidad'
        onPress={goToPrivacyPolicyURL}
      />
    </View>
  )
}

export default Settings
