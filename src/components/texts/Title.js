import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Title = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.h1,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h1: { ...theme.fonts.h1 }
})

export default Title
