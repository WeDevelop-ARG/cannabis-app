import React from 'react'
import { View } from 'react-native'
import RenderedImage from '../RenderedImage'
import styles from './styles'

const CarouselImage = ({ item }) => (
  <View style={styles.carouselImageContainer}>
    <RenderedImage uri={item} style={styles.carouselImage} />
  </View>
)

export default CarouselImage
