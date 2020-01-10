import React, { useEffect } from 'react'
import { Image } from 'react-native'
import * as firebase from 'firebase'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import * as DatabaseService from '~/databaseService'
import Background from '~/components/Background'
import { Title } from '~/components/texts'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'

const MILLISECONDS_SHOWING_SPLASH_SCREEN = 2000

const checkIfSignedUp = () => {
  const unsuscribe = firebase.auth().onAuthStateChanged(async user => {
    unsuscribe()
    if (user) {
      const username = await DatabaseService.queryUsernameFromEmail(user.email)
      if (!username) {
        NavigationService.navigate('UsernameRequest')
      } else {
        NavigationService.navigate('MainApp')
      }
    } else {
      NavigationService.navigate('SignUp')
    }
  })
}

const LoadingScreen = () => {
  AnalyticsService.setCurrentScreenName('Loading Screen')

  useEffect(() => {
    const decideIfGoToOnboardingScreenOrSignUpScreen = async () => {
      if (!await CacheService.getItem('OnboardingSeen')) {
        NavigationService.navigate('Onboarding')
      } else {
        checkIfSignedUp()
      }
    }

    setTimeout(() => decideIfGoToOnboardingScreenOrSignUpScreen(), MILLISECONDS_SHOWING_SPLASH_SCREEN)
  }, [])

  return (
    <Background style={styles.container}>
      <Image
        style={styles.DrCannabisIcon}
        source={DrCannabis}
      />
      <Title primary style={styles.DrCannabisText}>Dr. Cannabis</Title>
    </Background>
  )
}

export default LoadingScreen
