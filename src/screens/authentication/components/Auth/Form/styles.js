import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const PLACEHOLDER_COLOR = theme.colors.gray
export const PASSWORD_TOGGLE_ICON_SIZE = moderateScale(16, 1)

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: theme.colors.secondary
  },
  errorMessage: {
    marginLeft: theme.sizes.margin,
    color: theme.colors.secondary
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: verticalScale(25),
    marginBottom: verticalScale(16)
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
  },
  passwordContainer: {
    flexDirection: 'row'
  },
  togglePasswordButton: {
    position: 'absolute',
    alignSelf: 'center',
    right: (theme.sizes.containerWidth * 0.08),
    elevation: 5
  }
})

export default styles
