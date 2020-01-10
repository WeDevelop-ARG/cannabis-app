import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const ITEM_HEIGHT = verticalScale(280)
const ITEM_WIDTH = widthPercentageToDP('100%')

const CAROUSEL_IMAGE_CONTAINER = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT
}

const styles = StyleSheet.create({
  activityContainer: {
    ...CAROUSEL_IMAGE_CONTAINER,
    justifyContent: 'center'
  }
})

export default styles
