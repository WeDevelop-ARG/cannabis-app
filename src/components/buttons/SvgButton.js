import React from 'react'
import { StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'
import Button from './Button'
import { theme } from '~/constants'

const SvgButton = (props) => {
  const {
    buttonStyle,
    svgStyle,
    onPress,
    svg,
    width,
    height,
    disabled,
    ...restProps
  } = props

  let privateOnPress = onPress
  let disabledStyle

  if (disabled) {
    privateOnPress = null
    disabledStyle = styles.disabledBackground
  }

  return (
    <Button
      style={[buttonStyle, disabledStyle]}
      onPress={privateOnPress}
      {...restProps}
    >
      <SvgXml
        style={svgStyle}
        width={width}
        height={height}
        xml={svg}
      />
    </Button>
  )
}

SvgButton.propTypes = {
  svg: PropTypes.any.isRequired
}

SvgButton.defaultProps = {
  width: 10,
  height: 10
}

const styles = StyleSheet.create({
  disabledBackground: {
    backgroundColor: theme.colors.gray
  }
})

export default SvgButton
