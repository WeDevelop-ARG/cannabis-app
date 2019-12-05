import React from 'react'
import { View, Image } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'

const OnBoardingItem = ({ imageSource, children }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={imageSource} />
    <AppText style={styles.text}>{children}</AppText>
  </View>
)

export default OnBoardingItem
