import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import NavigationService from '../../navigationService'
import * as firebase from 'firebase'

const checkIfLoggedIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      NavigationService.navigate('Home')
    } else {
      NavigationService.navigate('SignUp')
    }
  })
}

const LoadingScreen = () => {
  useEffect(() => checkIfLoggedIn())

  return (
    <ActivityIndicator />
  )
}

export default LoadingScreen
