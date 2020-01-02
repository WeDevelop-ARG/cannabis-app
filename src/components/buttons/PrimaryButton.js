import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedButton from './ThemedButton'
import { theme } from '~/constants'

const PrimaryButton = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.primary,
    style
  ]

  return (
    <ThemedButton
      style={buttonStyles}
      {...restProps}
    >
      {children}
    </ThemedButton>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary
  }
})

export default PrimaryButton
