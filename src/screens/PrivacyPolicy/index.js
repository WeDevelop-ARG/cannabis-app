import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { PrimaryButton, Description } from '~/components'
import privacyPolicy from '~/configs/privacyPolicy'
import styles from './styles'
import { HeaderBackButton } from 'react-navigation-stack'

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView style={styles.webview} source={{ uri: privacyPolicy.url }} />
      <PrimaryButton style={styles.button} onPress={() => navigation.pop()}>
        <Description white>Aceptar</Description>
      </PrimaryButton>
    </View>
  )
}

PrivacyPolicy.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <HeaderBackButton onPress={() => navigation.pop()} />
  )
})

export default PrivacyPolicy
