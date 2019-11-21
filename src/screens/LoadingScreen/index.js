import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'

const checkIfLoggedIn = () => {
  const unsuscribe = firebase.auth().onAuthStateChanged(user => {
    unsuscribe()
    if (user) {
      NavigationService.navigate('MainApp')
    } else {
      NavigationService.navigate('Login')
    }
  })
}

const LoadingScreen = () => {
  AnalyticsService.setCurrentScreenName('Loading Screen')

  useEffect(() => {
    const decideIfGoToPrivacyPolicyScreenOrLoginScreen = async () => {
      if (!await CacheService.getItem('privacyPolicyAccepted')) {
        NavigationService.navigate('PrivacyPolicy')
      } else {
        checkIfLoggedIn()
      }
    }
    decideIfGoToPrivacyPolicyScreenOrLoginScreen()
  }, [])

  return (
    <ActivityIndicator />
  )
}

export default LoadingScreen
