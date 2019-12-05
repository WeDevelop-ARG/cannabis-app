import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

const baseMarginVertical = {
  marginVertical: verticalScale(5)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DrCannabisIcon: {
    width: scale(175),
    height: verticalScale(175),
    ...baseMarginVertical
  },
  DrCannabisText: {
    color: 'rgba(92, 254, 78, 0.71)',
    fontSize: scale(30),
    fontWeight: 'bold',
    ...baseMarginVertical
  }

})

export default styles
