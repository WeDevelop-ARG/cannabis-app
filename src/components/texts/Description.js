import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Description = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.description,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  description: { ...theme.fonts.description }
})

export default Description
