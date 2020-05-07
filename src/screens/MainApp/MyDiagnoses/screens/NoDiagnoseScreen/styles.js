import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const ICON_WIDTH = moderateScale(100, 1)
export const ICON_HEIGHT = moderateScale(100, 1)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  CTA: {
    marginTop: verticalScale(52)
  },
  icon: {
    marginLeft: moderateScale(37, 1),
    marginTop: verticalScale(144)
  },
  title: {
    marginTop: verticalScale(32),
    textAlign: 'center',
    width: '50%'
  },
  description: {
    marginTop: verticalScale(16),
    textAlign: 'center',
    width: theme.sizes.containerWidth
  }
})

export default styles
