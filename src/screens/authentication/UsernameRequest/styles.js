import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const PLACEHOLDER_TEXT_COLOR = theme.colors.gray
export const ICON_WIDTH = moderateScale(66.53)
export const ICON_HEIGHT = moderateScale(51.41)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  icon: {
    marginTop: verticalScale(105)
  },
  title: {
    marginTop: verticalScale(33),
    marginBottom: verticalScale(12)
  },
  description: {
    textAlign: 'center',
    width: theme.sizes.containerWidth
  },
  textInput: {
    width: theme.sizes.containerWidth,
    height: theme.sizes.base,
    marginTop: verticalScale(25),
    padding: theme.sizes.padding,
    paddingLeft: scale(14),
    borderRadius: theme.sizes.border,
    color: theme.colors.black,
    textDecorationLine: 'none',
    backgroundColor: theme.colors.white,
    ...theme.fonts.body,
    ...theme.shadows
  },
  error: {
    marginLeft: scale(24),
    alignSelf: 'flex-start',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15)
  },
  submitIndicator: {
    marginBottom: theme.sizes.margin
  },
  submitButton: {
    marginTop: verticalScale(40)
  },
  lastSuggestionBox: {
    borderBottomWidth: scale(0)
  },
  submitButtonWithError: {
    marginTop: verticalScale(20)
  },
  suggestionContainer: {
    borderColor: '#DADADA',
    borderRadius: scale(5),
    borderWidth: scale(1)
  },
  suggestionTitle: {
    ...theme.fonts.h3,
    marginBottom: verticalScale(24)
  }
})

export default styles
