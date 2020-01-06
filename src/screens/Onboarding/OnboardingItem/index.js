import React from 'react'
import { View } from 'react-native'
import { Description, Title } from '~/components'
import { SvgXml } from 'react-native-svg'
import styles from './styles'
import { scale } from 'react-native-size-matters/extend'

const OnboardingItem = ({ image, title, description }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <SvgXml style={styles.image} width={scale(image.width)} height={scale(image.height)} xml={image.source} />
    </View>
    <Title style={styles.title}>{title}</Title>
    <Description gray style={styles.text}>{description}</Description>
  </View>
)

export default OnboardingItem
