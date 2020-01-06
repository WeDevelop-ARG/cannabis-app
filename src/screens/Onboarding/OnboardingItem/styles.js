import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...StyleSheet.absoluteFill
  },
  imageContainer: {
    width: scale(160),
    height: scale(160),
    position: 'absolute',
    top: verticalScale(116),
    backgroundColor: 'rgba(94, 206, 132, 0.12)',
    borderRadius: scale(80),
    alignItems: 'center',
    overflow: 'visible'
  },
  image: {
    position: 'absolute',
    top: verticalScale(41)
  },
  text: {
    position: 'absolute',
    top: verticalScale(372),
    left: scale(47),
    right: scale(47),
    textAlign: 'center'
  },
  title: {
    position: 'absolute',
    top: verticalScale(324)
  }
})

export default styles
