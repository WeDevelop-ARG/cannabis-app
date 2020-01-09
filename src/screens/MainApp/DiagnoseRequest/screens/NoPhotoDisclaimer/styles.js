import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const ICON_WIDTH = moderateScale(74)
export const ICON_HEIGHT = moderateScale(60.84)
export const ICON_TOP_DISPLACEMENT_IN_DP = 130

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: verticalScale(225)
  },
  iconBackground: {
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(ICON_TOP_DISPLACEMENT_IN_DP),
    width: moderateScale(69),
    height: moderateScale(56),
    backgroundColor: 'rgba(94, 206, 132, 0.2)'
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(ICON_TOP_DISPLACEMENT_IN_DP)
  },
  information: {
    textAlign: 'center',
    width: theme.sizes.containerWidth,
    marginTop: theme.sizes.margin,
    marginBottom: verticalScale(43)
  }
})

export default styles
