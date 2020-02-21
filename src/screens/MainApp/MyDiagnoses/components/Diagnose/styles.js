import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../../constants'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: scale(24),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.gray2,
    backgroundColor: theme.colors.gray3,
    alignItems: 'center'
  },
  image: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    borderRadius: theme.sizes.border,
    marginVertical: verticalScale(22)
  },
  information: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: verticalScale(22),
    marginLeft: scale(16)
  },
  dates: {
    flexDirection: 'row',
    marginBottom: verticalScale(5)
  },
  description: {
    flex: 2
  },
  metadata: {
    flexDirection: 'row',
    marginTop: verticalScale(11)
  },
  separator: {
    marginHorizontal: scale(12)
  }
})

export default styles
