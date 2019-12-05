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

const MILLISECONDS_SHOWING_SPLASH_SCREEN = 2000

const checkIfSignedUp = () => {
  const unsuscribe = firebase.auth().onAuthStateChanged(user => {
    unsuscribe()
    if (user) {
      NavigationService.navigate('MainApp')
    } else {
      NavigationService.navigate('SignUp')
    }
  })
}

const LoadingScreen = () => {
  AnalyticsService.setCurrentScreenName('Loading Screen')

  useEffect(() => {
    const decideIfGoToOnBoardingScreenOrSignUpScreen = async () => {
      if (!await CacheService.getItem('OnBoardingSeen')) {
        NavigationService.navigate('OnBoarding')
      } else {
        checkIfSignedUp()
      }
    }

    setTimeout(() => decideIfGoToOnBoardingScreenOrSignUpScreen(), MILLISECONDS_SHOWING_SPLASH_SCREEN)
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
