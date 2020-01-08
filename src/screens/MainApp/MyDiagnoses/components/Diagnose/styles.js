import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters/extend'
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../../constants'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: theme.sizes.containerWidth,
    paddingTop: verticalScale(22),
    marginTop: verticalScale(22),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.gray2
  },
  image: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    borderRadius: theme.sizes.border
  },
  information: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: scale(16)
  },
  dates: {
    flexDirection: 'row',
    marginBottom: verticalScale(5)
  },
  description: {
    flex: 2
  },
  answers: {
    marginTop: verticalScale(11)
  }
})

export default styles
