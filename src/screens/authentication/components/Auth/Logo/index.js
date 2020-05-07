import React from 'react'
import image from '~/assets/images/logo.svg'
import { SvgXml } from 'react-native-svg'
import { verticalScale, scale } from 'react-native-size-matters/extend'

const Logo = () => {
  return (
    <SvgXml width={scale(54)} height={verticalScale(55)} xml={image} marginTop={verticalScale(-5)} />
  )
}

export default Logo
