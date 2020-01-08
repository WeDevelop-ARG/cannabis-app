import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    padding: scale(24)
  },
  image: {
    position: 'absolute',
    top: verticalScale(127),
    backgroundColor: '#5ECE8433',
    borderRadius: moderateScale(10)
  },
  title: {
    position: 'absolute',
    top: verticalScale(221)
  },
  description: {
    position: 'absolute',
    textAlign: 'center',
    top: verticalScale(257)
  },
  button: {
    position: 'absolute',
    top: verticalScale(378)
  }
})

export default styles
