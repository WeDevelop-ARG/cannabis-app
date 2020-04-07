import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const SUBMITTING_INDICATOR_SIZE = moderateScale(25, 1)

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center'
  },
  submitButton: {
    marginTop: verticalScale(30)
  },
  errorMessage: {
    marginTop: verticalScale(-10),
    textAlign: 'left',
    width: theme.sizes.containerWidth
  },
  formErrorMessage: {
    marginTop: verticalScale(10),
    textAlign: 'left',
    width: theme.sizes.containerWidth
  }
})

export default styles
