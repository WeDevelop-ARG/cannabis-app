import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

const marginVerticalBase = {
  marginVertical: verticalScale(15)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: scale(250),
    height: verticalScale(250),
    ...marginVerticalBase
  },
  text: {
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '500',
    color: 'white',
    ...marginVerticalBase
  }
})

export default styles
