import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: verticalScale(485)
  }
})

export default styles
