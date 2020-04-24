import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: verticalScale(26)
  }
})

export default styles
