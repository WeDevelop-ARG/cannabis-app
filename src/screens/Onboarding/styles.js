import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  carouselContainer: {
    height: verticalScale(500),
    borderRadius: moderateScale(30),
    padding: theme.sizes.padding
  },
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
    borderColor: theme.colors.white,
    borderWidth: scale(3),
    backgroundColor: theme.colors.alpha
  }
})

export default styles
