import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DrCannabisIcon: {
    width: moderateScale(250),
    height: moderateScale(250)
  },
  DrCannabisText: {
    fontSize: moderateScale(44)
  }
})

export default styles
