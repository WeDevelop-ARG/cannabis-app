import React from 'react'
import { Image } from 'react-native'

const RenderedImage = ({ uri, style }) => {
  return (
    <Image
      style={style}
      source={{ uri }}
    />
  )
}

export default RenderedImage
