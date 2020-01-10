import React from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { PrimaryButton, Description, Header } from '~/components'
import privacyPolicy from '~/configs/privacyPolicy'
import styles from './styles'
import { HeaderBackButton } from 'react-navigation-stack'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters/extend'

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView style={styles.webview} source={{ uri: privacyPolicy.url }} />
      <PrimaryButton style={styles.button} onPress={() => navigation.goBack()}>
        <Description white>Aceptar</Description>
      </PrimaryButton>
    </View>
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
