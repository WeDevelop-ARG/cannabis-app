import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { scale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: verticalScale(21),
    right: scale(22)
  }
})

export default styles
