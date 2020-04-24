import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const PLACEHOLDER_COLOR = theme.colors.gray

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: theme.colors.error
  },
  errorMessage: {
    marginLeft: theme.sizes.margin
  },
  submitButton: {
    alignSelf: 'center',
    marginBottom: verticalScale(21)
  },
  label: {
    width: theme.sizes.containerWidth,
    height: theme.sizes.base,
    margin: theme.sizes.margin,
    padding: theme.sizes.padding,
    paddingLeft: theme.sizes.padding,
    alignSelf: 'center',
    borderRadius: theme.sizes.border,
    color: theme.colors.black,
    textDecorationLine: 'none',
    backgroundColor: theme.colors.white,

    ...theme.fonts.body,
    ...theme.shadows
  }
})

export default styles
