import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

export const ITEM_HEIGHT = verticalScale(280)
export const ITEM_WIDTH = widthPercentageToDP('100%')
export const CAROUSEL_SLIDER_WIDTH = widthPercentageToDP('100%')

const CAROUSEL_IMAGE_CONTAINER = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT
}

const paginationDotSize = moderateScale(11)
const inactivePaginationDotSize = moderateScale(13)

const styles = StyleSheet.create({
  paginationContainer: {
    ...StyleSheet.absoluteFillObject,
    top: ITEM_HEIGHT * 0.67
  },
  paginationDot: {
    width: paginationDotSize,
    height: paginationDotSize,
    borderRadius: paginationDotSize * 0.5,
    backgroundColor: theme.colors.white,
    marginLeft: -scale(6)
  },
  inactivePaginationDot: {
    width: inactivePaginationDotSize,
    height: inactivePaginationDotSize,
    borderRadius: inactivePaginationDotSize * 0.5,
    backgroundColor: theme.colors.white
  },
  carouselImageContainer: {
    ...CAROUSEL_IMAGE_CONTAINER
  },
  activityContainer: {
    ...CAROUSEL_IMAGE_CONTAINER,
    justifyContent: 'center'
  },
  carouselImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0
  },
  placeholder: {
    width: '100%',
    resizeMode: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.black
  }
})

export default styles
