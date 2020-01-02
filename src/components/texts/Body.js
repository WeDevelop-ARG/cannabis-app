import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Body = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.body,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  body: { ...theme.fonts.body }
})

export default Body
