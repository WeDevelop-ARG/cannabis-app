import React from 'react'
import { View } from 'react-native'
import Title from './Title'
import Navigation from './Navigation'
import Form from './Form'
import Separator from './Separator'
import SocialNetworks from './SocialNetworks'
import PrivacyPolicy from './PrivacyPolicy'
import styles from './styles'

const Auth = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)

Auth.Navigation = Navigation
Auth.Title = Title
Auth.Form = Form
Auth.Separator = Separator
Auth.SocialNetworks = SocialNetworks
Auth.PrivacyPolicy = PrivacyPolicy

export default Auth
