import React, { useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import * as firebase from 'firebase'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import * as DatabaseService from '~/databaseService'
import Background from '~/components/Background'
import { Title } from '~/components/texts'
import Logo from '~/components/Logo'
import styles, { LOGO_WIDTH, LOGO_HEIGHT } from './styles'
import * as notificationService from '../../notificationService'

const MILLISECONDS_SHOWING_SPLASH_SCREEN = 1500

const getCurrentUser = () => {
  return new Promise(resolve => {
    const unsuscribe = firebase.auth().onAuthStateChanged(async user => {
      unsuscribe()
      resolve(user || null)
    })
  })
}

const getUsernameFromUser = user => DatabaseService.queryUsernameFromEmail(user.email)

const getNextScreen = async () => {
  const onboardingSeen = await CacheService.getItem('OnboardingSeen')

  if (!onboardingSeen) return 'Onboarding'

  const user = await getCurrentUser()

  if (user) {
    const username = await getUsernameFromUser(user)

    if (username) {
      if (notificationService.popInitialNotification()) {
        return 'MyDiagnoses'
      }
      return 'MainApp'
    } else return 'UsernameRequest'
  }

  return 'SignUp'
}

const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.LONG)
}

const LoadingScreen = () => {
  AnalyticsService.setCurrentScreenName('Loading Screen')

  useEffect(() => {
    let screenToNavigate
    let timeoutFired = false

    setTimeout(() => {
      if (screenToNavigate) NavigationService.navigate(screenToNavigate)

      timeoutFired = true
    }, MILLISECONDS_SHOWING_SPLASH_SCREEN)

    getNextScreen().then(nextScreen => {
      if (timeoutFired) NavigationService.navigate(nextScreen)

      screenToNavigate = nextScreen
    }).catch(err => {
      console.error(err)
      showToast('An error occurred, try again later')
    })
  }, [])

  return (
    <Background style={styles.container}>
      <Logo
        style={styles.DrCannabisIcon}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
      />
      <Title primary style={styles.DrCannabisText}>Dr. Cannabis</Title>
    </Background>
  )
}

export default LoadingScreen
