import { StyleSheet } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

export const ITEM_HEIGHT = heightPercentageToDP('30%')
export const ITEM_WIDTH = widthPercentageToDP('100%')
export const CAROUSEL_SLIDER_WIDTH = widthPercentageToDP('100%')

const CAROUSEL_IMAGE_CONTAINER = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT
}

const paginationDotSize = moderateScale(15)

const styles = StyleSheet.create({
  paginationContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end'
  },
  paginationDot: {
    width: paginationDotSize,
    height: paginationDotSize,
    borderRadius: paginationDotSize * 0.5,
    marginHorizontal: scale(3),
    backgroundColor: theme.colors.white
  },
  inactivePaginationDot: {
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
    backgroundColor: theme.colors.gray2
  }
})

export default styles
