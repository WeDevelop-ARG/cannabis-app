import React from 'react'
import { StyleSheet, View } from 'react-native'
import Body from '../texts/Body'
import { theme } from '~/constants'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import check from '~/assets/images/UsernameRequest/check.svg'
import { SvgXml } from 'react-native-svg'

const SuggestionBox = (props) => {
  const {
    children,
    textStyle,
    boxStyle,
    ...restProps
  } = props

  const suggestionsStyle = [
    styles.suggestionsbox,
    boxStyle
  ]
  const textStyles = [
    styles.text,
    textStyle
  ]

  return (
    <View style={suggestionsStyle} {...restProps}>
      <Body
        style={textStyles} {...restProps}
      >
        {children}
      </Body>
      <SvgXml xml={check} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  suggestionsbox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: theme.sizes.containerWidth,
    height: verticalScale(50),
    backgroundColor: theme.colors.white,
    borderRadius: scale(5),
    borderColor: theme.colors.gray2,
    borderBottomWidth: scale(1)
  },
  text: {
    flex: 1,
    marginStart: scale(13)
  },
  icon: {
    marginRight: scale(23)
  }
})

export default SuggestionBox
