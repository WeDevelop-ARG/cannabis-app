import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import DrCannabis from '~/assets/images/DrCannabis.png'

const THUMBNAIL_SIZE = scale(50)

const RealThumbnailOrPlaceholder = ({ thumbnail, style }) => (
  <Image
    source={thumbnail ? { uri: thumbnail } : DrCannabis}
    style={[baseStyles.thumbnail, style]}
  />
)

const baseStyles = StyleSheet.create({
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE
  }
})

export default RealThumbnailOrPlaceholder
