import React from 'react'
import { Text as ReactText, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { theme } from '~/constants'

const Text = (props) => {
  const {
    style,
    colorVariant,
    fontVariant,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.text,
    colorVariant && styles[colorVariant],
    fontVariant && styles[fontVariant],
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

  h1: { ...theme.fonts.h1 },
  h2: { ...theme.fonts.h2 },
  h3: { ...theme.fonts.h3 },
  description: { ...theme.fonts.description },
  body: { ...theme.fonts.body },
  date: { ...theme.fonts.date },

  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  black: { color: theme.colors.black },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  gray3: { color: theme.colors.gray3 }
})

Text.propTypes = {
  style: PropTypes.object,
  colorVariant: PropTypes.oneOf(['primary', 'secondary', 'black', 'white', 'gray', 'gray2', 'gray3']),
  fontVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'description', 'body', 'date'])
}

Text.defaultProps = {
  colorVariant: 'black',
  fontVariant: 'body'
}

export default Text
