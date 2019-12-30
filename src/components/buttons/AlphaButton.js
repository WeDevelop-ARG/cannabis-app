import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedButton from './ThemedButton'
import { theme } from '~/constants'

const AlphaButton = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.alpha,
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
  alpha: {
    backgroundColor: theme.colors.alpha
  }
})

export default AlphaButton
