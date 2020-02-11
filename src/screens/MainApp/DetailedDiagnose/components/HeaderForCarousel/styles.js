import { StyleSheet } from 'react-native'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const BACK_BUTTON_COLOR = theme.colors.white
const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    top: verticalScale(13),
    zIndex: 1
  },
  backButton: {
    marginLeft: scale(8)
  },
  photoQuantityContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(2, 1),
    marginRight: scale(14)
  },
  rightContainer: {
    flexDirection: 'row'
  },
  threeDotsButton: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(4),
    marginRight: scale(16)
  }
})

export default styles
