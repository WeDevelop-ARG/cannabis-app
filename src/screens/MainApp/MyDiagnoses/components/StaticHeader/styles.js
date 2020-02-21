import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: scale(24),
    marginBottom: verticalScale(20)
  },
  headerWhileStatic: {
    textAlign: 'left',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(4)
  }
})

export default styles
