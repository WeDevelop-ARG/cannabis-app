import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  by: {
    marginBottom: verticalScale(8)
  },
  commentContainer: {
    width: theme.sizes.containerWidth,
    alignSelf: 'center',
    marginBottom: verticalScale(24),
    top: verticalScale(-24)
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(5, 1),
    marginTop: verticalScale(11),
    marginRight: scale(14)
  }
})

export default styles
