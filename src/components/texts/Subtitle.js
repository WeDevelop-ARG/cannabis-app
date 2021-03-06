import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Subtitle = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.h2,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h2: { ...theme.fonts.h2 }
})

export default Subtitle
