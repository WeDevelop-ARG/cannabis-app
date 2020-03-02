import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const SUBMITTING_INDICATOR_SIZE = moderateScale(25, 1)

const styles = StyleSheet.create({
  formContainer: {
    marginTop: verticalScale(40),
    alignItems: 'center'
  },
  submitButton: {
    marginTop: verticalScale(30)
  },
  errorMessage: {
    color: theme.colors.secondary,
    textAlign: 'center',
    width: theme.sizes.containerWidth
  }
})

export default styles
