import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Subheader = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.h4,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h4: { ...theme.fonts.h4 }
})

export default Subheader
