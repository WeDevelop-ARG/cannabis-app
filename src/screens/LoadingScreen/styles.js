import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DrCannabisIcon: {
    width: moderateScale(250),
    height: moderateScale(250),
    borderRadius: moderateScale(24),
    marginBottom: verticalScale(24)
  },
  DrCannabisText: {
    fontSize: moderateScale(44)
  }
})

export default styles
