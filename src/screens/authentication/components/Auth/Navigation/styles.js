import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(25),
    marginRight: scale(24)
  }
})

export default styles
