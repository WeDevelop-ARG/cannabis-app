import React from 'react'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from 'react-native-size-matters'
import DrCannabis from '~/assets/images/DrCannabis.png'

const THUMBNAIL_SIZE = scale(50)

const RealThumbnailOrPlaceholder = ({ thumbnail, style }) => (
  <FastImage
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
