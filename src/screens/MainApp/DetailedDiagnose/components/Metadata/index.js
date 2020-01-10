import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters/extend'
import { Body } from '~/components/texts'

const ICON_HEIGHT = moderateScale(20, 1)
const ICON_WIDTH = moderateScale(20, 1)

const MetadataItem = ({ data, style, svg }) => (
  <View style={style}>
    <SvgXml
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      xml={svg}
    />
    <Body>{data}</Body>
  </View>
)

const Metadata = ({ metadataContainerStyle, children }) => (
  <View style={metadataContainerStyle}>
    {children}
  </View>
)

Metadata.Item = MetadataItem

export default Metadata
