import React from 'react'
import { SvgXml } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters/extend'
import checkmark from '~/assets/images/checkmark.svg'

const CHECKMARK_ICON_SIZE_WIDTH = moderateScale(15, 1)
const CHECKMARK_ICON_SIZE_HEIGHT = moderateScale(16, 1)

const Checkmark = (props) => {
  const {
    style
  } = props

  return (
    <SvgXml
      style={style}
      width={CHECKMARK_ICON_SIZE_WIDTH}
      height={CHECKMARK_ICON_SIZE_HEIGHT}
      xml={checkmark}
    />
  )
}

export default Checkmark
