import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import AppText from '~/helpers/AppText'
import Background from '~/helpers/Background'
import NavigationService from '~/navigationService'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import GoogleButton from '../SocialNetworks/GoogleButton'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'
import MessagingService from '~/messagingService'

const onEmailButtonPress = () => {
  NavigationService.navigate('LoginEmail')
}

const onGoogleButtonPress = async () => {
  try {
    const signInData = await AuthenticationService.getGoogleSignInData()
    const userEmail = signInData.user.email
    if (await AuthenticationService.emailAlreadyHasGoogleSignIn(userEmail)) {
      await AuthenticationService.loginWithGoogleSignInData(signInData)
      await MessagingService.checkForPermissions()
      await MessagingService.saveFCMTokenForCurrentUser()
      NavigationService.navigate('MainApp')
    } else {
      const username = await DatabaseService.queryUsernameFromEmail(userEmail)
      if (username) {
        await AuthenticationService.loginWithGoogleSignInData()
        await MessagingService.checkForPermissions()
        await MessagingService.saveFCMTokenForCurrentUser()
        NavigationService.navigate('MainApp')
      } else {
        NavigationService.navigate('UsernameRequest', { socialNetwork: 'google' })
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

const Login = () => {
  AnalyticsService.setCurrentScreenName('Login')

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={DrCannabis}
          style={styles.drCannabisIcon}
        />
        <AppText style={styles.welcomeMessage}>Bienvenido a Dr. Cannabis!</AppText>
        <GoogleButton style={styles.googleButton} onPress={onGoogleButtonPress} />
        <AppText style={styles.optionDisclaimer}>ó</AppText>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={onEmailButtonPress}
        >
          <AppText style={styles.emailButtonText}>Ingresá con tu email o usuario</AppText>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default Login
