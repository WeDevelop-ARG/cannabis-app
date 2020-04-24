import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: scale(53),
    height: verticalScale(56),
    top: verticalScale(60)
  }
})

export default styles
