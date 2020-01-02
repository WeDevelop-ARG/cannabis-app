import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedButton from './ThemedButton'
import { theme } from '~/constants'

const GrayButton = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const buttonStyles = [
    styles.gray,
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
  gray: {
    backgroundColor: theme.colors.gray
  }
})

export default GrayButton
