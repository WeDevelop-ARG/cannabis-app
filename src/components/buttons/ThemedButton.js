import React from 'react'
import { StyleSheet } from 'react-native'
import Button from './Button'
import { theme } from '~/constants'
import { moderateScale } from 'react-native-size-matters'

const ThemedButton = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.button,
    style
  ]

  return (
    <Button
      style={buttonStyles}
      {...restProps}
    >
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(5),
    height: theme.sizes.base,
    width: theme.sizes.containerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.sizes.margin,
    padding: theme.sizes.padding
  }
})

export default ThemedButton
