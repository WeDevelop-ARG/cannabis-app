import { StyleSheet } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters/extend'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

export const ITEM_HEIGHT = heightPercentageToDP('100%')
export const ITEM_WIDTH = widthPercentageToDP('100%')
export const CAROUSEL_SLIDER_WIDTH = widthPercentageToDP('100%')

const paginationDotSize = moderateScale(11)
const inactivePaginationDotSize = moderateScale(13)

const CAROUSEL_IMAGE_CONTAINER = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT
}

const styles = StyleSheet.create({
  paginationContainer: {
    ...StyleSheet.absoluteFillObject,
    top: ITEM_HEIGHT * 0.85
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
  carouselImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0
  }
})

export default styles
