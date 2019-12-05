import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  headerImage: {
    width: moderateScale(75),
    height: moderateScale(75)
  },
  button: {
    margin: verticalScale(15)
  },
  buttonText: {
    color: 'white',
    fontSize: scale(14)
  }
})

export default styles
