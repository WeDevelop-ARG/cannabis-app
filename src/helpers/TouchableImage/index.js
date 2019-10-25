import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import AppText from '~/helpers/AppText'

export const TouchableImageWithText = ({ wholeStyle, imageStyle, textStyle, onPress, source, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={wholeStyle}
  >
    <Image
      source={source}
      style={imageStyle}
    />
    <AppText style={textStyle}>
      {children}
    </AppText>
  </TouchableOpacity>
)

export const TouchableImage = ({ style, onPress, source }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={source}
      style={style}
    />
  </TouchableOpacity>
)
