import React from 'react'
import { StyleSheet, View } from 'react-native'
import TextInput from './TextInput'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const PLACEHOLDER_COLOR = theme.colors.gray

const ThemedTextInput = (props) => {
  const {
    borderStyle,
    inputStyle,
    ...restProps
  } = props

  const borderStyles = [styles.label, borderStyle]
  const inputStyles = [styles.input, inputStyle]

  return (
    <View style={borderStyles}>
      <TextInput
        style={inputStyles}
        placeholderTextColor={PLACEHOLDER_COLOR}
        {...restProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    width: theme.sizes.containerWidth,
    height: theme.sizes.base,
    margin: theme.sizes.margin,
    padding: theme.sizes.padding,
    paddingLeft: theme.sizes.padding,
    alignSelf: 'center',
    borderRadius: theme.sizes.border,
    color: theme.colors.black,
    backgroundColor: theme.colors.white,

    ...theme.fonts.body,
    ...theme.shadows
  },
  input: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingLeft: moderateScale(11),
    paddingVertical: moderateScale(4),
    color: theme.colors.black,
    textDecorationLine: 'none',
    ...theme.fonts.body
  }
})

export default ThemedTextInput
