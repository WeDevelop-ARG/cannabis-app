import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as firebase from 'firebase'
import { createStackNavigator } from 'react-navigation-stack'
import { includes } from 'lodash'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import MessagingService from '~/messagingService'
import { Button, Title, Subtitle, Description } from '~/components'
import Background from '~/components/Background'
import PrivacyPolicy from '~/screens/PrivacyPolicy'
import PasswordChange from '../PasswordChange'
import policyLogo from '~/assets/images/Profile//policy_logo.svg'
import logOutLogo from '~/assets/images/Profile//logout_logo.svg'
import passwordChangeLogo from '~/assets/images/Profile//password_change_logo.svg'
import styles from './styles'

const goToPrivacyPolicyURL = () => {
  NavigationService.navigate('PrivacyPolicy')
}

const goToPasswordChangeScreen = () => NavigationService.navigate('PasswordChange')

const logOut = async () => {
  try {
    await MessagingService.deleteFCMTokenForCurrentUser()
    await firebase.auth().signOut()
    NavigationService.navigate('Login')
  } catch (error) {
    console.log(error.message)
  }
}

const ListItem = ({ text, onPress, imgSource }) => {
  return (
    <View style={styles.listItem}>
      <Button onPress={onPress} style={styles.itemButton}>
        <View style={styles.itemImageContainer}>
          <SvgXml style={styles.itemImage} xml={imgSource} />
        </View>
        <Description styles={styles.itemText} black>
          {text}
        </Description>
      </Button>
    </View>
  )
}

const Profile = () => {
  AnalyticsService.setCurrentScreenName('Profile')

  const [username, setUsername] = useState('')
  const email = firebase.auth().currentUser.email

  useEffect(
    () => {
      DatabaseService.queryUsernameFromEmail(email)
        .then(username => setUsername(username))
        .catch(() => setUsername('Usuario'))
    },
    [username]
  )

  return (
    <Background style={styles.container}>
      <ScrollView>
        <Title black style={styles.title}>Mi cuenta</Title>
        <View style={styles.userContainer}>
          <Subtitle black style={styles.username}>{username}</Subtitle>
          <Description gray>{email}</Description>
        </View>
        <ListItem text='Cambiar contraseña' onPress={goToPasswordChangeScreen} imgSource={passwordChangeLogo} />
        <ListItem text='Política de privacidad' onPress={goToPrivacyPolicyURL} imgSource={policyLogo} />
        <ListItem text='Cerrar sesión' onPress={logOut} imgSource={logOutLogo} />
      </ScrollView>
    </Background>
  )
}

Profile.navigationOptions = () => ({
  header: null
})

const Navigator = createStackNavigator(
  {
    Profile,
    PrivacyPolicy,
    PasswordChange
  }
)

const allowedRoutesToShowTabBar = ['Profile']

Navigator.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes.length <= 1) return {}

  const routes = navigation.state.routes
  const latestRouteName = routes[routes.length - 1].routeName
  const tabBarVisible = includes(allowedRoutesToShowTabBar, latestRouteName)

  return { tabBarVisible, swipeEnabled: tabBarVisible }
}

export default Navigator
