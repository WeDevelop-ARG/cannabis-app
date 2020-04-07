import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Error = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.error,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
    ...theme.fonts.error
  }
})

export default Error
