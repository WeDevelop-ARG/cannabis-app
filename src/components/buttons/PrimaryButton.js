import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedButton from './ThemedButton'
import { theme } from '~/constants'

const PrimaryButton = (props) => {
  const {
    style,
    children,
    disabled,
    ...restProps
  } = props

  const buttonStyles = [
    (disabled) ? styles.disabled : styles.primary,
    style
  ]

  return (
    <ThemedButton
      style={buttonStyles}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </ThemedButton>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary
  },
  disabled: {
    backgroundColor: theme.colors.gray
  }
})

export default PrimaryButton
