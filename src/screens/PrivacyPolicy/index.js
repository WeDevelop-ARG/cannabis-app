import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import AppText from '~/helpers/AppText'
import NavigationService from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import { goToPrivacyPolicyURL } from '~/mixins/privacyPolicyMixins'
import Background from '~/helpers/Background'
import styles from './styles'

const onAcceptPolicy = async () => {
  await CacheService.setItem('privacyPolicyAccepted', 'true')
  NavigationService.navigate('LoadingScreen')
}

const PrivacyPolicy = () => {
  AnalyticsService.setCurrentScreenName('PrivacyPolicy')

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.disclaimerContainer}>
          <AppText style={styles.disclaimer}>
              Al usar esta aplicación aceptas nuestra{' '}
            <Text
              style={styles.privacyPolicyURL}
              onPress={goToPrivacyPolicyURL}
            >
              política de privacidad
            </Text>
          </AppText>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={onAcceptPolicy}
        >
          <AppText style={styles.buttonText}>
            Acepto
          </AppText>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default PrivacyPolicy
