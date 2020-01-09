import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const PLACEHOLDER_TEXT_COLOR = theme.colors.gray
export const ICON_WIDTH = moderateScale(66.53)
export const ICON_HEIGHT = moderateScale(51.41)

const ICON_TOP_DISPLACEMENT_IN_DP = 89

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: verticalScale(175)
  },
  iconBackground: {
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(ICON_TOP_DISPLACEMENT_IN_DP + 10),
    width: moderateScale(62),
    height: moderateScale(42),
    backgroundColor: 'rgba(94, 206, 132, 0.2)'
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(ICON_TOP_DISPLACEMENT_IN_DP)
  },
  title: {
    alignSelf: 'center',
    marginBottom: verticalScale(12)
  },
  description: {
    alignSelf: 'center',
    textAlign: 'center',
    width: theme.sizes.containerWidth
  },
  textInput: {
    width: theme.sizes.containerWidth,
    height: theme.sizes.base,
    marginTop: verticalScale(35),
    marginBottom: verticalScale(30),
    padding: theme.sizes.padding,
    paddingLeft: scale(14),
    alignSelf: 'center',
    borderRadius: theme.sizes.border,
    color: theme.colors.black,
    textDecorationLine: 'none',
    backgroundColor: theme.colors.white,
    ...theme.fonts.body,
    ...theme.shadows
  },
  error: {
    alignSelf: 'center',
    marginBottom: theme.sizes.margin
  },
  submitIndicator: {
    alignSelf: 'center',
    marginBottom: theme.sizes.margin
  }
})

export default styles
