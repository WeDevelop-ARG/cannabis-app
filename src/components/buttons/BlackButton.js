import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedButton from './ThemedButton'
import { theme } from '~/constants'

const BlackButton = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.black,
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
  black: {
    backgroundColor: theme.colors.black
  }
})

export default BlackButton
