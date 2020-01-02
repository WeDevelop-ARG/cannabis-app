import React from 'react'
import { StyleSheet } from 'react-native'
import Text from './Text'
import { theme } from '~/constants'

const Date = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  const textStyles = [
    styles.date,
    style
  ]

  return (
    <Text style={textStyles} {...restProps}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  date: { ...theme.fonts.date }
})

export default Date
