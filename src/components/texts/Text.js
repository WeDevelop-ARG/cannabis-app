import React from 'react'
import { Text as ReactText, StyleSheet } from 'react-native'
import { theme } from '~/constants'

const Text = (props) => {
  const {
    style,
    primary,
    secondary,
    black,
    gray,
    gray2,
    gray3,
    white,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.text,
    primary && styles.primary,
    secondary && styles.secondary,
    black && styles.black,
    gray && styles.gray,
    gray2 && styles.gray2,
    gray3 && styles.gray3,
    white && styles.white,
    style // this is the last applied style, which can overwrite the others
  ]

  return (
    <ReactText style={textStyles} {...restProps}>
      {children}
    </ReactText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black
  },

  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  black: { color: theme.colors.black },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  gray3: { color: theme.colors.gray3 },
  white: { color: theme.colors.white }
})

export default Text
