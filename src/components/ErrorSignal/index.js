import React from 'react'
import { SvgXml } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters/extend'
import errorIcon from '~/assets/images/exclamationErrorIcon.svg'

const ERROR_ICON_SIZE_WIDTH = moderateScale(16, 1)
const ERROR_ICON_SIZE_HEIGHT = moderateScale(22, 1)

const ErrorSignal = (props) => {
  const {
    style
  } = props

  return (
    <SvgXml
      style={style}
      width={ERROR_ICON_SIZE_WIDTH}
      height={ERROR_ICON_SIZE_HEIGHT}
      xml={errorIcon}
    />
  )
}

export default ErrorSignal
