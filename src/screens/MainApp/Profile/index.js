import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import NavigationService from '~/navigationService'
import * as firebase from 'firebase'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import MessagingService from '~/messagingService'
import { goToPrivacyPolicyURL } from '~/mixins/privacyPolicyMixins'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text, Button } from '~/components'
import styles from './styles'

const LogOut = async () => {
  try {
    await MessagingService.deleteFCMTokenForCurrentUser()
    await firebase.auth().signOut()
    NavigationService.navigate('Login')
  } catch (error) {
    console.log(error.message)
  }
}

const ListItem = ({ text, onPress }) => {
  return (
    <View style={styles.listItem}>
      <Button onPress={onPress} style={styles.itemButton}>
        <Image style={styles.itemImage} />
        <Text styles={styles.itemText} colorVariant='black'>
          {text}
        </Text>
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
        .then(_username => setUsername(_username))
        .catch(() => setUsername('Usuario'))
    },
    [username]
  )

  return (
    <View style={styles.container}>
      <Text fontVariant='h1' colorVariant='black' style={styles.title}>Perfil</Text>
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.userContainer}>
          <View style={styles.leftContainer}>
            <Text fontVariant='h2' colorVariant='black'>{username}</Text>
            <Text fontVariant='body' colorVariant='black'>{email}</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => { LogOut() }}>
              <Icon type='font-awesome' name='power-off' size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <ListItem text='Política de Privacidad' onPress={goToPrivacyPolicyURL} />
      </ScrollView>
    </View>
  )
}

export default Profile
