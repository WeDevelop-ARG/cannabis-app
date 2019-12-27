import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    height: moderateScale(150),
    width: moderateScale(150),
    backgroundColor: 'gray',
    marginTop: scale(40),
    marginBottom: scale(30)
  },
  button: {
    padding: moderateScale(20),
    margin: moderateScale(20)
  },
  buttonLink: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  title: {
    margin: moderateScale(10)
  },
  description: {
    textAlign: 'center'
  }
})
export default styles
