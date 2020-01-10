import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CTA: {
    marginTop: verticalScale(30)
  }
})

export default styles
