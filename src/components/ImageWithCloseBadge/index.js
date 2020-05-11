import React from 'react'
import { View, StyleSheet } from 'react-native'
import ImageButton from '~/components/buttons/ImageButton'
import XClose from '~/components/badges/XClose'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'

const ImageWithCloseBadge = ({ uri, onPress, imageStyle, containerStyle }) => {
  return (
    <View style={containerStyle}>
      <XClose style={styles.closeBadge} />
      <ImageButton
        source={{ uri }}
        onPress={onPress}
        style={[styles.image, imageStyle]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  closeBadge: {
    alignSelf: 'flex-end',
    right: scale(7),
    top: verticalScale(9),
    position: 'absolute',
    zIndex: 1
  },
  image: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(5, 1),
    marginRight: scale(14),
    marginTop: verticalScale(16)
  }
})

export default ImageWithCloseBadge
