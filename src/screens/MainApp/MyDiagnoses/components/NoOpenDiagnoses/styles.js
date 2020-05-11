import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const ICON_WIDTH = moderateScale(59, 1)
export const ICON_HEIGHT = moderateScale(57, 1)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    marginTop: verticalScale(50)
  },
  icon: {
    marginTop: verticalScale(168)
  },
  description: {
    marginTop: verticalScale(21),
    textAlign: 'center',
    width: theme.sizes.containerWidth
  }
})

export default styles
