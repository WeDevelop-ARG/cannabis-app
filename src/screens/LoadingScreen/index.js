import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import * as firebase from 'firebase'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import Background from '~/helpers/Background'
import AppText from '~/helpers/AppText'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

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

    setTimeout(() => decideIfGoToPrivacyPolicyScreenOrLoginScreen(), 4000)
  }, [])

  return (
    <Background>
      <View style={styles.container}>
        <Image
          style={styles.DrCannabisIcon}
          source={DrCannabis}
        />
        <AppText style={styles.DrCannabisText}>Dr. Cannabis</AppText>
      </View>
    </Background>
  )
}

export default LoadingScreen
