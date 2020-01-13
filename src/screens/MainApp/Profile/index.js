import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import NavigationService from '~/navigationService'
import * as firebase from 'firebase'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import MessagingService from '~/messagingService'
import { Button, Title, Subtitle, Description } from '~/components'
import styles from './styles'
import { SvgXml } from 'react-native-svg'
import LogOutLogo from './resources/logout_logo.svg'
import PolicyLogo from './resources/policy_logo.svg'
import { createStackNavigator } from 'react-navigation-stack'
import PrivacyPolicy from '~/screens/PrivacyPolicy'

const goToPrivacyPolicyURL = () => {
  NavigationService.navigate('PrivacyPolicy')
}

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
  AnalyticsService.setCurrentScreenName('Settings')

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
    <View style={styles.container}>
      <ScrollView>
        <Title black style={styles.title}>Mi cuenta</Title>
        <View style={styles.userContainer}>
          <Subtitle black style={styles.username}>{username}</Subtitle>
          <Description gray>{email}</Description>
        </View>
        <ListItem text='Política de privacidad' onPress={goToPrivacyPolicyURL} imgSource={PolicyLogo} />
        <ListItem text='Cerrar sesión' onPress={logOut} imgSource={LogOutLogo} />
      </ScrollView>
    </View>
  )
}

Profile.navigationOptions = () => ({
  header: null
})

const Navigator = createStackNavigator(
  {
    Profile,
    PrivacyPolicy
  }
)

export default Navigator
