import React from 'react'
import { Text, View, Button } from 'react-native'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as firebase from 'firebase'

const LogOut = async () => {
  try {
    await firebase.auth().signOut()
    NavigationService.navigate('Login')
  } catch (error) {
    console.log(error.message)
  }
}

const Home = () => {
  AnalyticsService.setCurrentScreenName('Home')
  return (
    <View>
      <Text>
      Home
      </Text>
      <Button
        title='log out'
        onPress={LogOut}
      />
    </View>
  )
}

export default Home
