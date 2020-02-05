import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from 'react-native-size-matters'
import { SvgXml } from 'react-native-svg'
import logo from '~/assets/images/logo.svg'

const THUMBNAIL_SIZE = scale(50)

const RealThumbnailOrPlaceholder = ({ thumbnail, style }) => (
  thumbnail ? (
    <FastImage
      source={{ uri: thumbnail }}
      style={[baseStyles.thumbnail, style]}
    />
  ) : (
    <View style={style}>
      <SvgXml
        width='100%'
        height='100%'
        xml={logo}
      />
    </View>
  )
)

const baseStyles = StyleSheet.create({
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE
  }
})

export default RealThumbnailOrPlaceholder
