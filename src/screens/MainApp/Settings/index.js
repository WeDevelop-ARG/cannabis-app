import React from 'react'
import { View, Button } from 'react-native'
import NavigationService from '~/navigationService'
import * as firebase from 'firebase'

const LogOut = async () => {
  try {
    await firebase.auth().signOut()
    NavigationService.navigate('Login')
  } catch (error) {
    console.log(error.message)
  }
}

const Settings = () => {
  return (
    <View>
      <Button
        title='Log out'
        onPress={() => { LogOut() }}
      />
    </View>
  )
}

export default Settings
