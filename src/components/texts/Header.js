import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Header = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.h3,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h3: { ...theme.fonts.h3 }
})

export default Header
