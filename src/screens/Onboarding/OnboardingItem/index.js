import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '~/components'
import styles from './styles'

const OnboardingItem = ({ imageSource, children }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={imageSource} />
    <Text fontVariant='description' style={styles.text}>{children}</Text>
  </View>
)

export default OnboardingItem
