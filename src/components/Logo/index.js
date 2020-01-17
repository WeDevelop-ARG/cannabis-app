import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import logo from '~/assets/images/logo.svg'

const Logo = ({ style, width, height }) => (
  <View style={style}>
    <SvgXml
      width={width}
      height={height}
      xml={logo}
    />
  </View>
)

export default Logo
