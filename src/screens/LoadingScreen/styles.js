import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters/extend'

export const LOGO_WIDTH = moderateScale(174)
export const LOGO_HEIGHT = moderateScale(180)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DrCannabisIcon: {
    marginBottom: verticalScale(24)
  },
  DrCannabisText: {
    fontSize: moderateScale(28, 1),
    color: '#25CB80'
  }
})

export default styles
