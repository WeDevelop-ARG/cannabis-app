import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as firebase from 'firebase'

const checkIfLoggedIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      NavigationService.navigate('MainApp')
    } else {
      NavigationService.navigate('Login')
    }
  })
}

const LoadingScreen = () => {
  useEffect(() => checkIfLoggedIn())
  AnalyticsService.setCurrentScreenName('Loading Screen')
  return (
    <ActivityIndicator />
  )
}

export default LoadingScreen
