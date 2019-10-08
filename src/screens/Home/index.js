import React from 'react'
import { Text, View, Button } from 'react-native'
import NavigationService from '../../navigationService'
import * as firebase from 'firebase'

const LogOut = async () => {
  await firebase.auth().signOut()
  NavigationService.navigate('SignUp')
}

const Home = () => {
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
