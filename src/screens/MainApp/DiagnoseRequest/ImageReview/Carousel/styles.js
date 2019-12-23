import { StyleSheet } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

export const ITEM_HEIGHT = heightPercentageToDP('80%')
export const ITEM_WIDTH = widthPercentageToDP('100%')
export const CAROUSEL_SLIDER_WIDTH = widthPercentageToDP('100%')

const styles = StyleSheet.create({
  paginationDot: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    marginHorizontal: scale(3),
    borderColor: theme.colors.primary,
    borderWidth: scale(3),
    backgroundColor: theme.colors.alpha
  },
  inactivePaginationDot: {
    borderColor: theme.colors.black,
    borderWidth: scale(3),
    backgroundColor: theme.colors.alpha
  }
})

export default styles
