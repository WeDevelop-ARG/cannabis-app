import React, { useEffect, useState, useCallback } from 'react'
import { ToastAndroid } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import * as firebase from 'firebase'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import * as DatabaseService from '~/databaseService'
import Background from '~/components/Background'
import { Title } from '~/components/texts'
import Logo from '~/components/Logo'
import styles, { LOGO_WIDTH, LOGO_HEIGHT } from './styles'
import * as notificationService from '~/notificationService'

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
  const netStatus = await NetInfo.fetch()

  if (!netStatus.isConnected) return 'NoConnection'

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

const delayedNavigate = async (waitTime, screenToNavigate) => {
  await new Promise((resolve) => setTimeout(resolve, waitTime))
  NavigationService.navigate(screenToNavigate)
}

const LoadingScreen = () => {
  AnalyticsService.setCurrentScreenName('Loading Screen')
  const [screenToNavigate, setScreenToNavigate] = useState('')
  const [mountedMilliseconds, setMountedMilliseconds] = useState(null)
  const [alreadyNavigate, setAlreadyNavigate] = useState(false)

  useEffect(() => {
    if (screenToNavigate && !alreadyNavigate) {
      const timeEllapsed = Date.now() - mountedMilliseconds
      setAlreadyNavigate(true)
      delayedNavigate(MILLISECONDS_SHOWING_SPLASH_SCREEN - timeEllapsed, screenToNavigate)
    }
  }, [screenToNavigate])

  useEffect(() => {
    setMountedMilliseconds(Date.now())

    getNextScreen()
      .then(nextScreen => setScreenToNavigate(nextScreen))
      .catch(err => {
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
