import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters/extend'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const ICON_HEIGHT = moderateScale(60, 1)
export const ICON_WIDTH = moderateScale(57, 1)

const styles = StyleSheet.create({
  container: {
    marginTop: theme.sizes.margin
  },
  background: {
    alignSelf: 'center'
  },
  outline: {
    position: 'absolute',
    alignSelf: 'center',
    top: verticalScale(-10)
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    width: widthPercentageToDP(60)
  }
})

export default styles
