import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, moderateScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    padding: theme.sizes.padding * 2,
    borderRadius: moderateScale(5),
    height: verticalScale(45),
    margin: theme.sizes.margin * 2,
    marginTop: verticalScale(0),
    marginBottom: verticalScale(0),
    ...theme.fonts.body
  }
})

export default styles
