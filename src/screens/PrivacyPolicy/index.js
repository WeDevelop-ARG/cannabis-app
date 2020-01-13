import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { verticalScale } from 'react-native-size-matters/extend'
import * as AnalyticsService from '~/analyticsService'
import { PrimaryButton, Description, Header } from '~/components'
import Background from '~/components/Background'
import privacyPolicy from '~/configs/privacyPolicy'
import { HeaderBackButton } from 'react-navigation-stack'
import styles from './styles'
import { theme } from '~/constants'

const PrivacyPolicy = ({ navigation }) => {
  AnalyticsService.setCurrentScreenName('Privacy Policy')

  return (
    <Background style={styles.container}>
      <WebView style={styles.webview} source={{ uri: privacyPolicy.url }} />
      <PrimaryButton style={styles.button} onPress={() => navigation.goBack()}>
        <Description white>Aceptar</Description>
      </PrimaryButton>
    </Background>
  )
}

PrivacyPolicy.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <HeaderBackButton onPress={() => navigation.goBack()} />
  ),
  title: 'Política de privacidad',
  headerStyle: {
    backgroundColor: theme.colors.white,
    height: verticalScale(44),
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: theme.colors.black,
  headerTitle: Header,
  headerTitleStyle: {
    ...StyleSheet.absoluteFillObject,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  headerTitleContainerStyle: {
    ...StyleSheet.absoluteFillObject
  }
})

export default PrivacyPolicy
