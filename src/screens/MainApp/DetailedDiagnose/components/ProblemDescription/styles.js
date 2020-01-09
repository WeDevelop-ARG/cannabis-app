import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  descriptionContainer: {
    marginBottom: verticalScale(32)
  },
  title: {
    marginBottom: verticalScale(18)
  }
})

export default styles
