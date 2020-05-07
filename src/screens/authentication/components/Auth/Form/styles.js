import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const PLACEHOLDER_COLOR = theme.colors.gray

const styles = StyleSheet.create({
  error: {
    textAlign: 'center'
  },
  errorMessage: {
    marginLeft: theme.sizes.margin
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: verticalScale(25),
    marginBottom: verticalScale(16)
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
