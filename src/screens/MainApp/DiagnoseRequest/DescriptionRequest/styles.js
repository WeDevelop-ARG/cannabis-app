import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: moderateScale(20)
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: moderateScale(1),
    margin: moderateScale(20)
  },
  description: {
    padding: moderateScale(10),
    textAlign: 'center'
  },
  button: {
    flexWrap: 'wrap',
    overflow: 'hidden',
    height: verticalScale(40),
    borderRadius: 2
  },
  buttonText: {
    position: 'absolute'
  }
})
export default styles
