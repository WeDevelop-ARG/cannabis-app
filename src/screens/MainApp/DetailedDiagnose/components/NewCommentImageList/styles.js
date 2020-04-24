import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  flatListContainerStyle: {
    alignSelf: 'center',
    marginLeft: scale(16)
  },
  imageContainer: {
    marginBottom: verticalScale(16)
  },
  image: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(5, 1),
    marginRight: scale(14),
    marginTop: verticalScale(16)
  },
  closeBadge: {
    alignSelf: 'flex-end',
    right: scale(7),
    top: verticalScale(9),
    position: 'absolute',
    zIndex: 1
  }
})

export default styles
