import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button } from '~/components'
import Background from '~/helpers/Background'
import NavigationService from '~/navigationService'
import * as AuthenticationService from '~/authenticationService'
import * as DatabaseService from '~/databaseService'
import * as AnalyticsService from '~/analyticsService'
import GoogleButton from '../SocialNetworks/GoogleButton'
import DrCannabis from '~/assets/images/DrCannabis.png'
import styles from './styles'
import { enableNotificationsForUser } from '../utils'

const onEmailButtonPress = () => {
  NavigationService.navigate('LoginEmail')
}

const onGoogleButtonPress = async () => {
  try {
    const signInData = await AuthenticationService.getGoogleSignInData()
    const userEmail = signInData.user.email
    if (await AuthenticationService.emailAlreadyHasGoogleSignIn(userEmail)) {
      await AuthenticationService.loginWithGoogleSignInData(signInData)
      await enableNotificationsForUser()
      NavigationService.navigate('MainApp')
    } else {
      const username = await DatabaseService.queryUsernameFromEmail(userEmail)
      if (username) {
        await AuthenticationService.loginWithGoogleSignInData()
        await enableNotificationsForUser()
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
        <Text fontVariant='h1' style={styles.welcomeMessage}>Bienvenido a Dr. Cannabis!</Text>
        <GoogleButton style={styles.googleButton} onPress={onGoogleButtonPress} />
        <Text fontVariant='description' style={styles.optionDisclaimer}>ó</Text>
        <Button
          variant='alpha'
          style={styles.emailButton}
          onPress={onEmailButtonPress}
        >
          <Text>Ingresá con tu email o usuario</Text>
        </Button>
      </View>
    </Background>
  )
}

export default Login
