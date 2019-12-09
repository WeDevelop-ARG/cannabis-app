import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { theme } from '~/constants'

const Button = (props) => {
  const {
    style,
    variant,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.button,
    variant && styles[variant],
    style // this is the last applied style, which can overwrite the others
  ]

  return (
    <TouchableOpacity
      style={buttonStyles}
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.border,
    height: theme.sizes.base,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.sizes.padding
  },

  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 }
})

Button.propTypes = {
  style: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'secondary', 'black', 'white', 'gray', 'gray2', 'gray3'])
}

Button.defaultProps = {
  variant: 'primary'
}

export default Button
