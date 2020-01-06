import React from 'react'
import { View } from 'react-native'
import { Text } from '~/components'
import styles from './style'
import { goToPrivacyPolicyURL } from '~/mixins/privacyPolicyMixins'

const PrivacyPolicyText = () => (
  <View style={styles.container}>
    <Text style={styles.policyText}> Al registrarte estás aceptando nuestra{' '}
      <Text
        onPress={goToPrivacyPolicyURL}
        style={styles.link}
      >
            politica de privacidad
      </Text>
    </Text>
  </View>
)

export default PrivacyPolicyText
